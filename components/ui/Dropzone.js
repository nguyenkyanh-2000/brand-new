import React, { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Import } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/tailwind-utils";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

export const Dropzone = React.forwardRef(
  ({ className, accept, ...props }, ref) => {
    const [file, setFile] = useState(null);
    const { setValue } = useFormContext();
    const { name } = props;

    const onDrop = useCallback(
      (acceptedFiles) => {
        const newFile = acceptedFiles[0];

        if (newFile) {
          const url = URL.createObjectURL(newFile);
          setFile(Object.assign(newFile, { preview: url }));
          setValue(name, url);
        }
      },
      [setValue, name]
    );

    const { getInputProps, getRootProps } = useDropzone({
      onDrop,
    });

    return (
      <>
        {file ? (
          <div className="relative w-full h-[300px]">
            <Image
              src={file.preview}
              alt={file.name}
              fill
              className={"object-fit"}
            ></Image>
          </div>
        ) : (
          <Card
            className={cn(
              `bg-muted border-dashed border-2 hover:border-muted-foreground/50 hover:cursor-pointer`,
              className
            )}
          >
            <CardContent
              className="flex flex-col items-center justify-center px-2 py-4 text-xs space-y-2"
              {...getRootProps()}
            >
              <>
                <Import className="h-8 w-8 text-muted-foreground" />
                <div className="flex items-center justify-center text-muted-foreground">
                  <span className="font-medium">Drag Files to Upload or</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto h-8 flex space-x-2 text-xs px-0 pl-1"
                  >
                    Click Here
                  </Button>
                  <input ref={ref} {...getInputProps()} {...props} />
                </div>
              </>
            </CardContent>
          </Card>
        )}
      </>
    );
  }
);

Dropzone.displayName = "Dropzone";
