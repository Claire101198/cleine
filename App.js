import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const STORAGE_KEY = 'daylight-study-data-v1';
const COLORS = {
  background: '#F7F6F1',
  card: '#FFFFFF',
  ink: '#202820',
  muted: '#81877F',
  green: '#355C45',
  paleGreen: '#E8EFE8',
  orange: '#E7A362',
  line: '#ECEDE7',
};

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function makeInitialData(today) {
  return {
    tasks: [
      { id: `${today}-1`, title: 'Review today’s lecture notes', done: false, date: today },
      { id: `${today}-2`, title: 'Read one chapter', done: false, date: today },
      { id: `${today}-3`, title: 'Practice with flashcards', done: false, date: today },
    ],
    sessionsByDay: {},
    studyDays: [],
  };
}

function getCurrentStreak(studyDays, today) {
  const days = new Set(studyDays);
  const cursor = new Date();
  if (!days.has(today)) cursor.setDate(cursor.getDate() - 1);

  let streak = 0;
  while (days.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function App() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('Today');
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const onSessionComplete = useRef(() => {});
  const deadline = useRef(0);
  const today = dateKey(new Date());

  useEffect(() => {
    let active = true;
    async function loadData() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (!active) return;
        if (!saved) {
          setData(makeInitialData(today));
          return;
        }
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed.tasks) || !Array.isArray(parsed.studyDays)) {
          throw new Error('Saved study data is in an unexpected format.');
        }
        setData({
          tasks: parsed.tasks,
          studyDays: parsed.studyDays,
          sessionsByDay: parsed.sessionsByDay || {},
        });
      } catch (error) {
        Alert.alert('Could not load your study data', error.message);
        if (active) setData(makeInitialData(today));
      }
    }
    loadData();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!data) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)).catch((error) => {
      Alert.alert('Could not save your study data', error.message);
    });
  }, [data]);

  useEffect(() => {
    onSessionComplete.current = () => {
      setData((current) => {
        if (!current) return current;
        const previous = current.sessionsByDay[today] || { count: 0, minutes: 0 };
        return {
          ...current,
          sessionsByDay: {
            ...current.sessionsByDay,
            [today]: {
              count: previous.count + 1,
              minutes: previous.minutes + selectedMinutes,
            },
          },
          studyDays: current.studyDays.includes(today)
            ? current.studyDays
            : [...current.studyDays, today],
        };
      });
      Alert.alert('Focus session complete', `${selectedMinutes} minutes well spent. Take a short break!`);
    };
  }, [selectedMinutes, today]);

  useEffect(() => {
    if (!isRunning) return undefined;
    const interval = setInterval(() => {
      const secondsLeft = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      setRemainingSeconds(secondsLeft);
      if (secondsLeft === 0) {
        clearInterval(interval);
        setIsRunning(false);
        onSessionComplete.current();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const todayTasks = useMemo(
    () => (data ? data.tasks.filter((task) => task.date === today) : []),
    [data, today],
  );
  const completedTasks = todayTasks.filter((task) => task.done).length;
  const todaySessions = data ? data.sessionsByDay[today] || { count: 0, minutes: 0 } : { count: 0, minutes: 0 };
  const streak = data ? getCurrentStreak(data.studyDays, today) : 0;
  const week = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - index));
        const key = dateKey(date);
        return {
          key,
          label: date.toLocaleDateString(undefined, { weekday: 'short' }),
          minutes: data ? (data.sessionsByDay[key] || { minutes: 0 }).minutes : 0,
          isToday: key === today,
        };
      }),
    [data, today],
  );
  const weekMax = Math.max(25, ...week.map((day) => day.minutes));
  const timerLabel = `${String(Math.floor(remainingSeconds / 60)).padStart(2, '0')}:${String(
    remainingSeconds % 60,
  ).padStart(2, '0')}`;

  function addTask() {
    const title = taskTitle.trim();
    if (!title || !data) return;
    setData((current) => ({
      ...current,
      tasks: [...current.tasks, { id: `${Date.now()}`, title, done: false, date: today }],
    }));
    setTaskTitle('');
  }

  function toggleTask(id) {
    setData((current) => ({
      ...current,
      tasks: current.tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    }));
  }

  function removeTask(id) {
    setData((current) => ({
      ...current,
      tasks: current.tasks.filter((task) => task.id !== id),
    }));
  }

  function chooseDuration(minutes) {
    if (isRunning) return;
    setSelectedMinutes(minutes);
    setRemainingSeconds(minutes * 60);
  }

  function resetTimer() {
    setIsRunning(false);
    setRemainingSeconds(selectedMinutes * 60);
  }

  function toggleTimer() {
    if (isRunning) {
      const secondsLeft = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      setRemainingSeconds(secondsLeft);
      setIsRunning(false);
      if (secondsLeft === 0) onSessionComplete.current();
      return;
    }

    const secondsLeft = remainingSeconds === 0 ? selectedMinutes * 60 : remainingSeconds;
    setRemainingSeconds(secondsLeft);
    deadline.current = Date.now() + secondsLeft * 1000;
    setIsRunning(true);
  }

  if (!data) {
    return (
      <SafeAreaView style={styles.loading}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.loadingText}>Getting your day ready…</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.app}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.brand}>daylight <Text style={styles.brandDot}>.</Text></Text>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
          </View>
          <View style={styles.avatar}><Text style={styles.avatarText}>✳</Text></View>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {tab === 'Today' && (
            <>
              <View style={styles.greeting}>
                <Text style={styles.eyebrow}>A LITTLE PROGRESS, EVERY DAY</Text>
                <Text style={styles.headline}>Make today{'\n'}count.</Text>
                <Text style={styles.intro}>A clear plan makes room for focused learning.</Text>
              </View>

              <View style={styles.streakCard}>
                <View style={styles.streakIcon}><Text style={styles.flame}>✦</Text></View>
                <View style={styles.streakCopy}>
                  <Text style={styles.streakTitle}>{streak} day{streak === 1 ? '' : 's'} in a row</Text>
                  <Text style={styles.streakCaption}>Your consistency is adding up</Text>
                </View>
                <Text style={styles.streakArrow}>↗</Text>
              </View>

              <View style={styles.sectionHeading}>
                <View>
                  <Text style={styles.sectionTitle}>Your plan</Text>
                  <Text style={styles.sectionHint}>{completedTasks} of {todayTasks.length} completed</Text>
                </View>
                <Text style={styles.sectionCount}>{String(todayTasks.length).padStart(2, '0')}</Text>
              </View>

              <View style={styles.taskCard}>
                {todayTasks.map((task, index) => (
                  <View key={task.id} style={[styles.taskRow, index > 0 && styles.taskBorder]}>
                    <Pressable
                      onPress={() => toggleTask(task.id)}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: task.done }}
                      style={[styles.checkbox, task.done && styles.checkboxDone]}
                    >
                      {task.done && <Text style={styles.checkmark}>✓</Text>}
                    </Pressable>
                    <Pressable style={styles.taskTextButton} onPress={() => toggleTask(task.id)}>
                      <Text style={[styles.taskText, task.done && styles.taskTextDone]}>{task.title}</Text>
                    </Pressable>
                    <Pressable onPress={() => removeTask(task.id)} hitSlop={8} accessibilityLabel="Remove task">
                      <Text style={styles.removeTask}>×</Text>
                    </Pressable>
                  </View>
                ))}
                {todayTasks.length === 0 && <Text style={styles.emptyText}>Add a small goal to get started.</Text>}
                <View style={styles.addTaskRow}>
                  <TextInput
                    value={taskTitle}
                    onChangeText={setTaskTitle}
                    onSubmitEditing={addTask}
                    placeholder="Add a study task…"
                    placeholderTextColor="#A2A79F"
                    returnKeyType="done"
                    style={styles.taskInput}
                    accessibilityLabel="New study task"
                  />
                  <Pressable onPress={addTask} style={styles.addButton} accessibilityLabel="Add task">
                    <Text style={styles.addButtonText}>+</Text>
                  </Pressable>
                </View>
              </View>

              <Pressable onPress={() => setTab('Focus')} style={styles.focusBanner}>
                <View>
                  <Text style={styles.focusBannerEyebrow}>READY WHEN YOU ARE</Text>
                  <Text style={styles.focusBannerTitle}>Find your focus</Text>
                  <Text style={styles.focusBannerCaption}>One session at a time</Text>
                </View>
                <View style={styles.focusBannerButton}><Text style={styles.bannerPlay}>▶</Text></View>
              </Pressable>
            </>
          )}

          {tab === 'Focus' && (
            <>
              <View style={styles.greeting}>
                <Text style={styles.eyebrow}>SLOW DOWN. TUNE IN.</Text>
                <Text style={styles.headline}>One thing{'\n'}at a time.</Text>
                <Text style={styles.intro}>Give your attention a place to land.</Text>
              </View>
              <View style={styles.timerCard}>
                <Text style={styles.timerEyebrow}>{isRunning ? 'YOU’RE IN THE ZONE' : 'YOUR NEXT FOCUS SESSION'}</Text>
                <View style={styles.timerFace}>
                  <View style={styles.timerInner}>
                    <Text style={styles.timer}>{timerLabel}</Text>
                    <Text style={styles.timerCaption}>MINUTES</Text>
                  </View>
                </View>
                <View style={styles.durationRow}>
                  {[25, 50].map((minutes) => (
                    <Pressable
                      key={minutes}
                      onPress={() => chooseDuration(minutes)}
                      disabled={isRunning}
                      style={[styles.durationChip, selectedMinutes === minutes && styles.durationChipActive]}
                    >
                      <Text style={[styles.durationText, selectedMinutes === minutes && styles.durationTextActive]}>
                        {minutes} min
                      </Text>
                    </Pressable>
                  ))}
                </View>
                <Pressable onPress={toggleTimer} style={styles.startButton}>
                  <Text style={styles.startButtonText}>{isRunning ? 'Pause session' : remainingSeconds === 0 ? 'Start again' : 'Start focusing'}</Text>
                  <Text style={styles.startButtonArrow}>{isRunning ? 'Ⅱ' : '→'}</Text>
                </Pressable>
                {(isRunning || remainingSeconds !== selectedMinutes * 60) && (
                  <Pressable onPress={resetTimer} style={styles.resetButton}>
                    <Text style={styles.resetText}>Reset timer</Text>
                  </Pressable>
                )}
              </View>
              <View style={styles.sessionSummary}>
                <Text style={styles.sessionSummaryIcon}>✦</Text>
                <Text style={styles.sessionSummaryText}>
                  {todaySessions.count === 0
                    ? 'Your first session is a great place to start.'
                    : `${todaySessions.count} session${todaySessions.count === 1 ? '' : 's'} today · ${todaySessions.minutes} focused minutes`}
                </Text>
              </View>
            </>
          )}

          {tab === 'Progress' && (
            <>
              <View style={styles.greeting}>
                <Text style={styles.eyebrow}>LOOK HOW FAR YOU’VE COME</Text>
                <Text style={styles.headline}>Small steps,{'\n'}big things.</Text>
                <Text style={styles.intro}>Every focused minute is part of the story.</Text>
              </View>
              <View style={styles.progressStats}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{streak}</Text>
                  <Text style={styles.statLabel}>DAY STREAK</Text>
                  <Text style={styles.statSymbol}>✦</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{todaySessions.minutes}</Text>
                  <Text style={styles.statLabel}>MINUTES TODAY</Text>
                  <Text style={styles.statSymbol}>◷</Text>
                </View>
              </View>
              <View style={styles.weekCard}>
                <Text style={styles.weekTitle}>This week</Text>
                <Text style={styles.weekHint}>Focused minutes by day</Text>
                <View style={styles.chart}>
                  {week.map((day) => (
                    <View key={day.key} style={styles.chartColumn}>
                      <Text style={styles.chartValue}>{day.minutes || ''}</Text>
                      <View style={styles.barTrack}>
                        <View
                          style={[
                            styles.bar,
                            { height: day.minutes ? Math.max(8, (day.minutes / weekMax) * 90) : 4 },
                            day.isToday && styles.barToday,
                          ]}
                        />
                      </View>
                      <Text style={[styles.chartLabel, day.isToday && styles.chartLabelToday]}>{day.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.encouragement}>
                <Text style={styles.encouragementIcon}>☀</Text>
                <View style={styles.encouragementCopy}>
                  <Text style={styles.encouragementTitle}>Keep showing up</Text>
                  <Text style={styles.encouragementText}>A short session still counts. Your streak grows every time you finish a focus timer.</Text>
                </View>
              </View>
            </>
          )}
        </ScrollView>

        <View style={styles.tabBar}>
          {[
            { name: 'Today', icon: '▦' },
            { name: 'Focus', icon: '◷' },
            { name: 'Progress', icon: '⌁' },
          ].map((item) => (
            <Pressable
              key={item.name}
              onPress={() => setTab(item.name)}
              style={styles.tab}
              accessibilityRole="tab"
              accessibilityState={{ selected: tab === item.name }}
            >
              <Text style={[styles.tabIcon, tab === item.name && styles.tabActive]}>{item.icon}</Text>
              <Text style={[styles.tabLabel, tab === item.name && styles.tabActive]}>{item.name}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  app: { flex: 1, backgroundColor: COLORS.background },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  loadingText: { color: COLORS.muted, fontSize: 15 },
  topBar: { paddingHorizontal: 26, paddingTop: 10, paddingBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { color: COLORS.ink, fontSize: 22, fontWeight: '800', letterSpacing: -1 },
  brandDot: { color: COLORS.orange },
  dateText: { color: COLORS.muted, fontSize: 12, marginTop: 3 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EEE8DA', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: COLORS.green, fontSize: 19 },
  content: { paddingHorizontal: 24, paddingBottom: 24 },
  greeting: { marginTop: 15, marginBottom: 22 },
  eyebrow: { color: COLORS.green, fontSize: 10, fontWeight: '700', letterSpacing: 1.7 },
  headline: { color: COLORS.ink, fontSize: 37, fontWeight: '700', letterSpacing: -1.5, lineHeight: 40, marginTop: 9 },
  intro: { color: COLORS.muted, fontSize: 14, lineHeight: 21, marginTop: 8 },
  streakCard: { backgroundColor: COLORS.green, borderRadius: 18, padding: 17, flexDirection: 'row', alignItems: 'center', marginBottom: 27 },
  streakIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#52745D', alignItems: 'center', justifyContent: 'center' },
  flame: { fontSize: 22, color: '#F5C47F' },
  streakCopy: { flex: 1, marginLeft: 13 },
  streakTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  streakCaption: { color: '#D5E0D6', fontSize: 11, marginTop: 4 },
  streakArrow: { color: '#D5E0D6', fontSize: 20 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { color: COLORS.ink, fontSize: 20, fontWeight: '700', letterSpacing: -0.5 },
  sectionHint: { color: COLORS.muted, fontSize: 12, marginTop: 3 },
  sectionCount: { color: COLORS.muted, fontSize: 12, fontWeight: '600' },
  taskCard: { backgroundColor: COLORS.card, borderRadius: 18, paddingHorizontal: 16, paddingTop: 2, paddingBottom: 13, borderWidth: 1, borderColor: '#F0F0EA' },
  taskRow: { minHeight: 54, flexDirection: 'row', alignItems: 'center' },
  taskBorder: { borderTopWidth: 1, borderTopColor: COLORS.line },
  checkbox: { width: 21, height: 21, borderRadius: 7, borderWidth: 1.5, borderColor: '#D5D9D0', alignItems: 'center', justifyContent: 'center' },
  checkboxDone: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  checkmark: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  taskTextButton: { flex: 1, paddingHorizontal: 11, paddingVertical: 13 },
  taskText: { color: COLORS.ink, fontSize: 13 },
  taskTextDone: { color: '#9A9F96', textDecorationLine: 'line-through' },
  removeTask: { color: '#A0A59D', fontSize: 21, paddingHorizontal: 4 },
  emptyText: { color: COLORS.muted, fontSize: 13, paddingVertical: 18 },
  addTaskRow: { borderTopWidth: 1, borderTopColor: COLORS.line, flexDirection: 'row', alignItems: 'center', paddingTop: 11, marginTop: 2 },
  taskInput: { flex: 1, color: COLORS.ink, fontSize: 13, paddingVertical: 7 },
  addButton: { width: 30, height: 30, borderRadius: 10, backgroundColor: COLORS.paleGreen, alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: COLORS.green, fontSize: 20, lineHeight: 24, fontWeight: '500' },
  focusBanner: { backgroundColor: '#EEE8DA', borderRadius: 18, padding: 18, marginTop: 17, marginBottom: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  focusBannerEyebrow: { color: '#77705E', fontSize: 9, fontWeight: '700', letterSpacing: 1.1 },
  focusBannerTitle: { color: COLORS.ink, fontSize: 17, fontWeight: '700', marginTop: 5 },
  focusBannerCaption: { color: '#77705E', fontSize: 11, marginTop: 3 },
  focusBannerButton: { width: 40, height: 40, borderRadius: 14, backgroundColor: '#F8F5ED', alignItems: 'center', justifyContent: 'center' },
  bannerPlay: { color: COLORS.green, fontSize: 13, marginLeft: 2 },
  timerCard: { backgroundColor: COLORS.card, borderRadius: 22, alignItems: 'center', paddingHorizontal: 20, paddingTop: 25, paddingBottom: 21, borderWidth: 1, borderColor: '#F0F0EA' },
  timerEyebrow: { color: COLORS.muted, fontSize: 10, letterSpacing: 1.4, fontWeight: '700' },
  timerFace: { width: 230, height: 230, borderRadius: 115, backgroundColor: '#EFF3EC', marginTop: 25, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E4EAE1' },
  timerInner: { width: 197, height: 197, borderRadius: 99, backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center' },
  timer: { color: COLORS.ink, fontSize: 54, fontWeight: '600', letterSpacing: -2 },
  timerCaption: { color: COLORS.muted, fontSize: 9, letterSpacing: 2, marginTop: 2 },
  durationRow: { flexDirection: 'row', marginTop: 23, gap: 10 },
  durationChip: { borderRadius: 12, borderWidth: 1, borderColor: COLORS.line, paddingVertical: 10, paddingHorizontal: 20 },
  durationChipActive: { backgroundColor: COLORS.paleGreen, borderColor: COLORS.paleGreen },
  durationText: { color: COLORS.muted, fontSize: 12, fontWeight: '600' },
  durationTextActive: { color: COLORS.green },
  startButton: { height: 53, borderRadius: 15, backgroundColor: COLORS.green, width: '100%', marginTop: 19, paddingHorizontal: 19, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' },
  startButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  startButtonArrow: { color: '#FFFFFF', fontSize: 17 },
  resetButton: { marginTop: 14, padding: 5 },
  resetText: { color: COLORS.muted, fontSize: 12 },
  sessionSummary: { backgroundColor: '#EEE8DA', borderRadius: 15, padding: 15, flexDirection: 'row', alignItems: 'center', marginTop: 17 },
  sessionSummaryIcon: { color: '#B88442', fontSize: 19, marginRight: 12 },
  sessionSummaryText: { flex: 1, color: '#706C60', fontSize: 12, lineHeight: 18 },
  progressStats: { flexDirection: 'row', gap: 12 },
  statCard: { backgroundColor: COLORS.card, flex: 1, minHeight: 125, borderRadius: 18, padding: 17, borderWidth: 1, borderColor: '#F0F0EA' },
  statValue: { color: COLORS.ink, fontSize: 31, fontWeight: '700' },
  statLabel: { color: COLORS.muted, fontSize: 9, fontWeight: '700', letterSpacing: 1, marginTop: 4 },
  statSymbol: { position: 'absolute', top: 16, right: 16, color: COLORS.orange, fontSize: 17 },
  weekCard: { backgroundColor: COLORS.card, borderRadius: 18, padding: 18, marginTop: 14, borderWidth: 1, borderColor: '#F0F0EA' },
  weekTitle: { color: COLORS.ink, fontSize: 17, fontWeight: '700' },
  weekHint: { color: COLORS.muted, fontSize: 11, marginTop: 3 },
  chart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20 },
  chartColumn: { flex: 1, alignItems: 'center' },
  chartValue: { color: COLORS.muted, fontSize: 9, height: 13 },
  barTrack: { height: 90, justifyContent: 'flex-end', alignItems: 'center', marginTop: 5 },
  bar: { width: 17, backgroundColor: '#DCE6DA', borderRadius: 8 },
  barToday: { backgroundColor: COLORS.green },
  chartLabel: { color: COLORS.muted, fontSize: 10, marginTop: 8 },
  chartLabelToday: { color: COLORS.green, fontWeight: '700' },
  encouragement: { backgroundColor: COLORS.paleGreen, borderRadius: 17, padding: 16, flexDirection: 'row', alignItems: 'flex-start', marginTop: 14, marginBottom: 20 },
  encouragementIcon: { color: COLORS.green, fontSize: 20, marginRight: 12 },
  encouragementCopy: { flex: 1 },
  encouragementTitle: { color: COLORS.green, fontSize: 13, fontWeight: '700' },
  encouragementText: { color: '#68756B', fontSize: 11, lineHeight: 17, marginTop: 4 },
  tabBar: { height: 68, backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.line, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 12 },
  tab: { alignItems: 'center', justifyContent: 'center', minWidth: 72, paddingVertical: 5 },
  tabIcon: { color: '#9DA39B', fontSize: 19, height: 23 },
  tabLabel: { color: '#9DA39B', fontSize: 10, marginTop: 2 },
  tabActive: { color: COLORS.green, fontWeight: '700' },
});

export default App;
