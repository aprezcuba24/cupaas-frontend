import { ComponentType } from 'react';
import { useFieldArray, Controller } from 'react-hook-form';
import { useFormContext } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { Dictionary } from '@/utils/get_dictionaries';
import { TrashIcon } from '@radix-ui/react-icons';
import { MouseEventHandler, useRef, useEffect } from 'react';
import BtnDashed from './BtnDashed';
import { useFormField } from '@/components/ui/form';
import * as _ from 'lodash';

export const ItemError = ({ field }: { field: string }) => {
  const { error } = useFormField()
  const message = _.get(error, `${field}.message`)
  if (!message) {
    return null;
  }
  return (
    <p
      className="text-[0.8rem] font-medium text-destructive"
    >
      {message}
    </p>
  )
}

type RowProps = {
  t: Dictionary,
  control: any,
  value: any,
  name: string,
  index: string | number,
  onRemove: MouseEventHandler<HTMLButtonElement>,
  Component?: React.ForwardRefExoticComponent<any>,
}

const Row = ({ t, control, value, onRemove, name, Component, index, ...rest }: RowProps) => {
  const inputRef = useRef(null);
  useEffect(() => {
    !value?.name && inputRef.current && (inputRef.current as HTMLInputElement).focus()
  }, [inputRef, value])

  return (
    <div className='flex mb-5 items-center'>
      <Controller
        render={({ field }) => (
          <div className='w-full mr-2'>
            {Component ? <Component {...rest} {...field} ref={inputRef} index={index} /> : <Input placeholder={t.project_form.branch_ph} {...field} ref={inputRef} required />}
          </div>
        )}
        defaultValue={value}
        name={name}
        control={control}
      />
      <button onClick={onRemove} className='bg-blue-900 text-white rounded-full w-6 h-6 hover:bg-red-400 pl-1'>
        <TrashIcon />
      </button>
    </div>
  )
}

type FormItemsProps = {
  name: string;
  t: Dictionary
  Component: React.ForwardRefExoticComponent<any>,
  BtnAdd?: ComponentType<{ onClick: () => void }>
  [key: string]: any,
}

export default function FormItems({ name, t, Component, BtnAdd, ...rest }: FormItemsProps) {
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
                {...rest}
                index={index}
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