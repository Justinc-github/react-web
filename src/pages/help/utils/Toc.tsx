import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
}

const Toc = () => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const headers = Array.from(
      document.querySelectorAll("h2, h3")
    ) as HTMLHeadingElement[];

    const toc = headers.map((el) => ({
      id: el.id,
      text: el.innerText,
    }));

    setTocItems(toc);
  }, []);

  return (
    <div className="position-sticky" style={{ top: "80px" }}>
      <h6 className="text-muted mb-2">On this page</h6>
      <ul className="list-unstyled small">
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-decoration-none d-block py-1"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toc;
