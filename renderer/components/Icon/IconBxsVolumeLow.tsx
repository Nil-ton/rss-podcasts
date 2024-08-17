import { ComponentProps } from "react";

interface IIconBxsVolumeLow extends ComponentProps<'svg'> {

}

export function IconBxsVolumeLow(props:IIconBxsVolumeLow) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="1em"
        width="1em"
        {...props}
      >
        <path d="M4 17h2.697L14 21.868V2.132L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zM16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5z" />
      </svg>
    );
  }