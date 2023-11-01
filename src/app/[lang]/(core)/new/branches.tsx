import { useFieldArray, Controller } from 'react-hook-form';
import { useFormContext } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { Dictionary } from '@/utils/get_dictionaries';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { MouseEventHandler, useRef, useEffect } from 'react';

type RowProps = {
  t: Dictionary,
  control: any,
  value: any,
  name: string,
  onRemove: MouseEventHandler<HTMLButtonElement>
}

const Row = ({ t, control, value, onRemove, name }: RowProps) => {
  const inputRef = useRef(null);
  useEffect(() => {
    !value?.name && inputRef.current && (inputRef.current as HTMLInputElement).focus()
  }, [inputRef, value])
  return (
    <div className='flex mb-5 items-center'>
      <Controller
        render={({ field }) => (
          <Input className='mr-2' placeholder={t.project_form.branch_ph} {...field} ref={inputRef} required />
        )}
        defaultValue={value}
        name={name}
        control={control}
      />
      <button onClick={onRemove} className='bg-blue-900 text-white rounded-full w-6 h-6 hover:bg-red-400'>
        <DoDisturbOnIcon className='-mt-1'/>
      </button>
    </div>
  )
}

type BranchesProps = {
  name: string;
  t: Dictionary
}

export default function Branches({ name, t }: BranchesProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleAppend = (value: any) => {
    append(value);
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <>
      <ul className='m-0'>
        {fields.map((item, index) => {
          return (
            <li key={item.id} className="input-container">
              <Row
                value={item}
                name={`${name}[${index}].ref`}
                onRemove={() => handleRemove(index)}
                t={t}
                control={control}
              />
            </li>
          );
        })}
        <li>
          <div onClick={() => handleAppend({ ref: '' })} className='border-dashed border-2 border-gray-500 h-8 cursor-text'></div>
        </li>
      </ul>
    </>
  );
}