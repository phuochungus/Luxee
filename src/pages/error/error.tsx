import { useRouteError } from "react-router-dom";

export function Error() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div>
            <div>{error.status}</div>
            <div>{error.message || "Something wrong happed!"}</div>
        </div>
    );
}
