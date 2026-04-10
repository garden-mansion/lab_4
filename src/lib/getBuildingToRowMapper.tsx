import TableRow from '../components/TableRow';
import type { Building } from '../data';

interface GetBuildingToRowMapperParams {
	begRange?: number;
	endRange?: number;
}

export const getBuildingToRowMapper =
	({
		begRange = -Infinity,
		endRange = Infinity,
	}: GetBuildingToRowMapperParams) =>
	(building: Building, index: number) => {
		return (
			<TableRow
				key={index}
				row={Object.values(building)}
				show={index >= begRange && index < endRange}
			/>
		);
	};
