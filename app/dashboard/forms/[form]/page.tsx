import { notFound } from "next/navigation";
import formMap from "../formMap";

interface FormPageProps {
  params: Promise<{ form: string }>;
}

export default async function FormPage({ params }: FormPageProps) {
  const { form } = await params; // <-- مهم
  const key = decodeURIComponent(form);

  const SelectedFormComponent = formMap[key];
  if (!SelectedFormComponent) {
    notFound();
  }

  return <SelectedFormComponent />;
}
