import React, { useEffect, useState } from "react";
import { Collapse as BootstrapCollapse } from "bootstrap";

export interface CollapseProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    isToggle?: boolean;
}

export function Collapse({ trigger, children, isToggle }: CollapseProps) {
    const [toggle, setToggle] = useState<boolean>(false ?? isToggle);
    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(toggle);
        const collapse = new BootstrapCollapse(ref.current!, { toggle });
        if (toggle) collapse.show();
        else collapse.hide();
    }, [toggle]);

    return (
        <>
            <div onClick={() => setToggle((toggle) => !toggle)}>{trigger}</div>
            <div className="collapse" ref={ref}>
                {children}
            </div>
        </>
    );
}
