import { Dictionary } from '@/utils/get_dictionaries';
import { IDeploy } from '@/types/deploy';
import { CheckIcon, Cross1Icon, PaperPlaneIcon } from '@radix-ui/react-icons';

type StepsProps = {
  t: Dictionary,
  deploy: IDeploy
}

const StepRow = ({ value }: { value: any }) => {
  const config = {
    PENDING: {
      icon: null,
      color: 'bg-gray-300',
      textColor: '',
    },
    STARTED: {
      icon: <PaperPlaneIcon/>,
      color: 'bg-blue-500',
      textColor: 'text-white',
    },
    ABORTED: {
      icon: <Cross1Icon/>,
      color: 'bg-red-400',
      textColor: 'text-white',
    },
    FINISHED: {
      icon: <CheckIcon/>,
      color: 'bg-green-500',
      textColor: 'text-white',
    },
  }
  const configItem = config[value.STATUS as keyof typeof config]
  const icon = configItem['icon']
  const color = configItem['color']
  const textColor = configItem['textColor']
  const size = 35
  return (
    <div className="flex mb-3">
      <div className={`rounded-full mr-1 flex justify-center items-center ${color} text-white`} style={{ height: size, width: size }}>
        {icon}
      </div>
      <div className={`w-full rounded pt-1 pl-5 ${color} ${textColor}`}>{value.LABEL}</div>
    </div>
  )
};

export default function Steps({ t, deploy }: StepsProps) {
  const steps = Object.entries(deploy.steps)
  return (
    <>
      <h2 className='mb-5'>{t.deploy.steps}</h2>
      {steps.map(([key, value]) => <StepRow key={key} value={value} />)}
    </>
  )
}