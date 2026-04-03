import type { Dispatch, FC, MouseEventHandler, SetStateAction } from "react";
import type { Building } from "../data";

interface FilterProps {
  dataTable: Building[],
  setDataTable: Dispatch<SetStateAction<Building[]>>,
  fullData: Building[],
  resetCurrentPage: () => void;
}

export const Filter: FC<FilterProps> = (props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // создаем словарь со значениями полей формы
    const filterField: Pick<Building, "title" | "buildType"> = {
      title: formData.get("title")!.toString().toLowerCase(),
      buildType: formData.get("buildType")!.toString().toLowerCase()
    };

    //фильтруем данные по значениям всех полей формы
    let arr: Building[] = props.fullData;
    for (const key in filterField) {
      if (key !== "buildType" && key !== "title") continue;

      arr = arr.filter(item => item[key].toLowerCase().includes(filterField[key]));  
    }

    props.setDataTable(arr);
    props.resetCurrentPage()
  }

  const handleClear: MouseEventHandler<HTMLButtonElement> = () => {
    props.setDataTable(props.fullData);
    props.resetCurrentPage()
  }


  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>Название:</label>
        <input name="title" type="text" />
      </p>
      <p>
        <label>Type:</label>
        <input name="buildType" type="text" />
      </p>
      <p>
        <button type="submit">Фильтровать</button>
        <button type="reset" onClick={handleClear}>Очистить фильтр</button>
      </p>
    </form>
  )
}