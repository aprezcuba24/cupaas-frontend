import { ComponentType, MutableRefObject } from 'react';
import { useFieldArray, Controller } from 'react-hook-form';
import { useFormContext } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { Dictionary } from '@/utils/get_dictionaries';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { MouseEventHandler, useRef, useEffect } from 'react';
import BtnDashed from './BtnDashed';

export type TRow = ComponentType<{ value: any, ref: MutableRefObject<null>}>

type RowProps = {
  t: Dictionary,
  control: any,
  value: any,
  name: string,
  onRemove: MouseEventHandler<HTMLButtonElement>,
  Component?: TRow,
}

const Row = ({ t, control, value, onRemove, name, Component }: RowProps) => {
  const inputRef = useRef(null);
  useEffect(() => {
    !value?.name && inputRef.current && (inputRef.current as HTMLInputElement).focus()
  }, [inputRef, value])

  return (
    <div className='flex mb-5 items-center'>
      <Controller
        render={({ field }) => (
          <div className='w-full mr-2'>
            {Component ? <Component {...field} ref={inputRef} /> : <Input placeholder={t.project_form.branch_ph} {...field} ref={inputRef} required />}
          </div>
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

type FormItemsProps = {
  name: string;
  t: Dictionary
  Component: TRow,
  BtnAdd?: ComponentType<{ onClick: () => void }>
}

export default function FormItems({ name, t, Component, BtnAdd }: FormItemsProps) {
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

  const handleAdd = () => handleAppend({ name: '', value: '' })

  return (
    <>
      <ul className='m-0'>
        {fields.map((item, index) => {
          return (
            <li key={item.id} className="input-container">
              <Row
                value={item}
                name={`${name}[${index}]`}
                onRemove={() => handleRemove(index)}
                t={t}
                control={control}
                Component={Component}
              />
            </li>
          );
        })}
        <li>
          {BtnAdd ? <BtnAdd onClick={handleAdd}/> : <BtnDashed onClick={handleAdd} className='w-full'></BtnDashed>}
        </li>
      </ul>
    </>
  );
}