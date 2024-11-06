import { useEffect, useState, type ReactElement } from "react";
import type { IconType } from "react-icons";

const loadIcons = (name: string) => {
  const iconLib = name.substring(0, 2).toLowerCase();

  switch (iconLib) {
    case "fi":
      return import("react-icons/fi");

    case "ri":
      return import("react-icons/ri");

    default:
      return null;
  }
};

const Icon = ({
  iconName,
  size,
  className,
}: {
  iconName: string;
  size?: number;
  className?: string;
}) => {
  const [importedComp, setImportedComp] = useState<ReactElement | null>(null);
  useEffect(() => {
    const importComponent = async () => {
      const module = await loadIcons(iconName);
      if (!module) {
        return;
      }
      const AnotherComponent = module[
        `${iconName}` as keyof typeof module
      ] as unknown as IconType;
      setImportedComp(
        <AnotherComponent size={size || 18} className={className} />
      );
    };

    importComponent();
  }, []);
  return <div>{importedComp}</div>;
};

export default Icon;
