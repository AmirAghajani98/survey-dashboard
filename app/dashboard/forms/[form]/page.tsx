import { notFound } from "next/navigation";
import formMap from "./formMap";

export default async function FormPage(props: {
  params: Promise<{ form: string }>;
}) {
  const { form } = await props.params;
  const key = decodeURIComponent(form);
  const SelectedForm = formMap[key];

  if (!SelectedForm) notFound();

  return <SelectedForm />;
}
