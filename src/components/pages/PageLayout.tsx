import "../styles/PageLayout.css";

type Props = {
    children :React.ReactNode;
};

export function PageLayout({children}: Props) {
    return(
        <div className="notebook">{children}</div>
    )
}
