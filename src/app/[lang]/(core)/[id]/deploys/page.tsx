import { getDeploys } from '@/services/deploy';
import { DataTable } from '@/components/table/data-table';
import { columns } from './_components/columns';
import { getCurrentDictionary } from '@/utils/get_dictionaries';

type PageProps = {
  params: {
    id: string;
  }
}

export default async function Page({ params: { id } }: PageProps) {
  const items = await getDeploys(id);
  const t = await getCurrentDictionary();
  return (
    <>
      <h2 className='mb-5'>{t.deploy.title}</h2>
      <DataTable columns={columns} data={items} />
    </>
  )
}