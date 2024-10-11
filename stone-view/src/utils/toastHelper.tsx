import { message } from "antd";

export const toastHelper = (text: string, Icon?: React.ReactNode) => {
  message.open({
    content: (
      <div className="flex items-center justify-center">
        {/* <span className="mr-2 flex items-center">{Icon}</span> */}
        <span className="text-base">{text}</span>
      </div>
    ),
    className: "flex items-center justify-center",
    duration: 5,
  });
};
