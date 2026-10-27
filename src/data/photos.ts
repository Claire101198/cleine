import switchgearRoom from '../assets/hero/switchgear-room.jpg'
import switchgearHall from '../assets/hero/switchgear-hall.jpg'
import plcPanel1 from '../assets/services/plc-control-panel-1.jpg'
import controlPanelHmi from '../assets/services/control-panel-hmi.jpg'
import mccPanel from '../assets/services/mcc-panel.jpg'
import distributionPanel from '../assets/services/distribution-panel.jpg'
import panelWiring from '../assets/services/panel-wiring.jpg'
import mccPanel2 from '../assets/services/mcc-panel-2.jpg'
import controlPanel3 from '../assets/services/control-panel-3.jpg'
import panelRoom from '../assets/services/panel-room.jpg'
import hmiCommissioning from '../assets/services/hmi-commissioning.jpg'
import cableTermination from '../assets/services/cable-termination.jpg'
import conduitInstallation from '../assets/services/conduit-installation.jpg'
import busbarTermination from '../assets/services/busbar-termination.jpg'
import equipmentInstallation from '../assets/services/equipment-installation.jpg'
import switchgearPanels from '../assets/services/switchgear-panels.jpg'

export const heroPhotos = {
  switchgearRoom,
  switchgearHall,
}

// One representative photo per service card, matched to the work it shows.
export const servicePhotoByServiceId: Record<string, string> = {
  'control-panel-fabrication': mccPanel,
  'plc-programming': controlPanelHmi,
  'electrical-installation': conduitInstallation,
  'industrial-automation': hmiCommissioning,
  'testing-commissioning': busbarTermination,
  'electrical-maintenance': cableTermination,
  'auxiliary-systems': equipmentInstallation,
}

export const galleryPhotos = [
  { src: plcPanel1, alt: 'Stainless-steel PLC control panel with pushbuttons and status lamps' },
  { src: mccPanel2, alt: 'Motor control center panel bank' },
  { src: controlPanel3, alt: 'Control panel installed on-site' },
  { src: distributionPanel, alt: 'Distribution panel with circuit breakers' },
  { src: panelWiring, alt: 'Internal panel wiring and terminal blocks' },
  { src: panelRoom, alt: 'Row of control panels inside an electrical room' },
  { src: switchgearPanels, alt: 'Low-voltage switchgear panel lineup' },
]
