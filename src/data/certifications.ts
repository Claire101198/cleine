import type { Certification } from './company'
import birCert from '../assets/certificates/bir-certificate.png'
import dtiCert from '../assets/certificates/dti-registration.png'
import prcCert from '../assets/certificates/prc-license.jpg'
import trainingCert1 from '../assets/certificates/training-certificate-1.jpg'
import trainingCert2 from '../assets/certificates/training-certificate-2.jpg'

export const certifications: Certification[] = [
  {
    title: 'BIR Certificate of Registration',
    image: birCert,
    alt: 'BIR Certificate of Registration for BPAC Industrial Control Service',
  },
  {
    title: 'DTI Business Registration',
    image: dtiCert,
    alt: 'DTI Business Name Registration certificate for BPAC Industrial Control Service',
  },
  {
    title: 'PRC License (PEE)',
    image: prcCert,
    alt: 'PRC Professional Electrical Engineer license',
  },
  {
    title: 'Training Certificates',
    image: trainingCert1,
    alt: 'Training certificate of completion',
  },
]

export const additionalTrainingCertificate = trainingCert2
