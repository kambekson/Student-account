import { FC } from "react";

import { RiExternalLinkFill } from "react-icons/ri";

import { ServiceFile } from "@/Common/Entity/Base/Common";
import Card from "@/Presentation/Components/Card";
import { useTranslation } from "react-i18next";

export const MaterialItem: FC<{
  material: ServiceFile;
  onOpen: (material: ServiceFile) => void;
}> = ({ material, onOpen }) => {
  const materialName = material.name;

  const { t } = useTranslation();

  return (
    <Card className="accent-2-border">
      <h3 className="material-name" title={materialName}>
        {materialName}
      </h3>
      <button className="external-link-button" onClick={() => onOpen(material)}>
        <RiExternalLinkFill className="mr-2 h-4 w-4" />
        <span style={{ marginTop: "10px" }}>{t("Открыть")}</span>
      </button>
    </Card>
  );
};
