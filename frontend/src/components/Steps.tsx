import { styled } from '@mui/material/styles';
import { StepLabel, Step, Stepper } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

import useGeneralStore from '../stores/generalStore/useGeneralStore';

const ProgressBar = ({step}: ProgressbarType) => {
    
    const stepsProgress = useGeneralStore(store => store.stepsProgress)
    const buyProgress = useGeneralStore(store => store.buyProgress)

    const activeStep = stepsProgress.findIndex(progress => progress.id === buyProgress.id)
  return (
    <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {stepsProgress.map((label) => (
            <Step key={label.id}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                    <p className='font-semi-bold text-mobile-xl lg:text-xl'>{label.name}</p>
                </StepLabel>
                <p className='font-extraligh text-mobile-lg lg:text-lg'>{label.description}</p>
                
            </Step>
        ))}
    </Stepper>
  )
}

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        
      </ColorlibStepIconRoot>
    );
}

  
const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 50%, rgb(255, 255, 255) 100%)',
        border: '10px solid #FFB800',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(255, 184, 0) 0%, rgb(255, 184, 0) 50%, rgb(255, 184, 0) 100%)',
    }),
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(255, 184, 0) 0%, rgb(255, 184, 0) 50%, rgb(255, 184, 0) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(255, 184, 0) 0%, rgb(255, 184, 0) 50%, rgb(255, 184, 0) 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 13,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 5,
    },
}));

export default ProgressBar