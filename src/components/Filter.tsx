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
    const filterField: Pick<Building, "title" | "buildType" | "country" | "city"> & {
      yearFrom: number;
      yearTo: number;
      heightFrom: number;
      heightTo: number;
    } = {
      title: formData.get("title")!.toString().toLowerCase(),
      buildType: formData.get("buildType")!.toString().toLowerCase(),
      country: formData.get("country")!.toString().toLowerCase(),
      city: formData.get("city")!.toString().toLowerCase(),

      yearFrom: formData.get("year-from") ? +formData.get("year-from")! : 0,
      yearTo: formData.get("year-to") ? +formData.get("year-to")! : 0,
      heightFrom: formData.get("height-from") ? +formData.get("height-from")! : 0,
      heightTo: formData.get("height-to") ? +formData.get("height-to")! : 0
    };

    console.log({ filterField });

    //фильтруем данные по значениям всех полей формы
    let arr: Building[] = props.fullData;
    for (const key in filterField) {
      if (
        key !== "title" && 
        key !== "buildType" && 
        key !== "country" && 
        key !== "city" && 
        key !== "yearFrom" && 
        key !== "yearTo" && 
        key !== "heightFrom" && 
        key !== "heightTo"
      ) continue;

      arr = arr.filter(item => {
        if (key === "buildType" || key === "title" || key === "country" || key === "city") {
          const stringCheckResult = item[key].toLowerCase().includes(filterField[key]);
          
          if (stringCheckResult) {
            console.log(item[key], 'fits key', key)
          }

          return stringCheckResult;
        }

        console.log('number key', key)
        const year = item.year;
        const height = item.height;
        console.log({year, height}, key, filterField[key])

        if (!filterField[key]) return true;

        if (key === "yearFrom") return year >= filterField[key];
        if (key === "yearTo") return year <= filterField[key];
        if (key === "heightFrom") return height >= filterField[key];
        if (key === "heightTo") return height <= filterField[key];

        console.log('no number key found');
      });  
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
        <label htmlFor="title">Название:</label>
        <input name="title" id="title" type="text" />
      </p>
      <p>
        <label htmlFor="buildType">Type:</label>
        <input name="buildType" id="buildType" type="text" />
      </p>

      <p>
        <label htmlFor="country">Страна</label>
        <input type="text" name="country" id="country" />
      </p>

      <p>
        <label htmlFor="city">Город</label>
        <input type="text" name="city" id="city" />
      </p>

      <p>
        <label htmlFor="year-from">Год от</label>
        <input type="number" name="year-from" id="year-from" min={1000} />
      </p>

      <p>
        <label htmlFor="year-to">Год до</label>
        <input type="number" name="year-to" id="year-to" min={1000} />
      </p>

      <p>
        <label htmlFor="height-from">Высота от</label>
        <input type="number" name="height-from" id="height-from" min={1} />
      </p>

      <p>
        <label htmlFor="height-to">Высота до</label>
        <input type="number" name="height-to" id="height-to" min={1} />
      </p>
      <p>
        <button type="submit">Фильтровать</button>
        <button type="reset" onClick={handleClear}>Очистить фильтр</button>
      </p>
    </form>
  )
}