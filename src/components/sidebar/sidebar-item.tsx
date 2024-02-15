interface props {
    name: string;
    isActive: boolean;
    link: string;
    svg: string;
}

export function SidebarItem({ name, isActive, link, svg }: props) {
    return (
        <li>
            <a href={link} className={`nav-link ${isActive ? "active" : "link-dark"}`}>
                <svg className={svg} width="16" height="16">
                    <use xlinkHref="bootstrap-icons/bootstrap-icons.svg#grid"></use>
                </svg>
                {name}
            </a>
        </li>
    );
}
