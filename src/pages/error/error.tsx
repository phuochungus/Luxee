import { useRouteError } from "react-router-dom";

export function Error() {
    const error: any = useRouteError();

    return (
        <div>
            <div>{error.status}</div>
            <div>{error.message}</div>
        </div>
    );
}
