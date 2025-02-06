import { LargeNavbar } from "@/app/global-components/large.navbar";
import { EditorComponent } from "./components/editor.component";
import { HttpStatus } from "@/lib/global.enum";
import { notFound } from "next/navigation";
import { PolicyActionServer } from "@/app/actions/policy/action.server";

async function getAdminPolicy() {
  const data = await PolicyActionServer.GetPolicyTnCFromAdmin();
  return data;
}

export default async function EditTnCPage() {
  const data = getAdminPolicy();

  if (
    !(await data).success &&
    (await data).status_code == HttpStatus.FORBIDDEN
  ) {
    notFound();
  }

  // console.log(data)
  const tncData = (await data).data;

  return (
    <>
      <LargeNavbar forAdmin={true} />
      <div className="container pt-11 md:pt-22 lg:pt-28">
        <div className="px-4 pb-11">
          <EditorComponent data={tncData} />
        </div>
      </div>
    </>
  );
}
