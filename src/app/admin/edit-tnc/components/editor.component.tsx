"use client";

import { PolicyAction } from "@/app/actions/policy/action";
import { GetPolicyResponse } from "@/app/responses/policy/response";
import { AuthButton } from "@/components/custom-ui/auth.button";
import { DisabledButton } from "@/components/custom-ui/disabled.buttont";
import { useToast } from "@/hooks/use-toast";
import { GlobalUtility } from "@/lib/global.utility";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export function EditorComponent({ data }: { data: GetPolicyResponse }) {
  const { toast } = useToast();
  const [value, setValue] = useState(data.content);
  const [onLoadUpdate, setOnLoadUpdate] = useState(false);
  
  const handleUpdateTnC = async () => {
    if (GlobalUtility.IsHTMLContentEmpty(value) || value.length < 20) {
      toast({
        description: `Input valid term and conditions!`,
        variant: "warning",
      });
      return;
    }

    setOnLoadUpdate(true)
    const result = await PolicyAction.EditTnCData(data.uuid, value)
    setOnLoadUpdate(false)
    if(result.success) {
        toast({
            description: `TNC updated!`,
            variant: "success",
          });
    }else {
        toast({
            description: `${result.data}`,
            variant: "danger",
          });
    }
  };
  return (
    <>
      <div className="w-1/2 max-w-1/2 mx-auto">
        <h1 className="text-xl md:text-2xl font-bold">
          Edit Term and Conditions
        </h1>
        <div className="mt-5">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
          <div className="w-full mt-3">
            {!onLoadUpdate ? (
                <AuthButton onClick={() => handleUpdateTnC()} title="Update" rouded="rounded-md" />
            ) : (
                <DisabledButton title="Updating..." rouded="rounded-md" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
