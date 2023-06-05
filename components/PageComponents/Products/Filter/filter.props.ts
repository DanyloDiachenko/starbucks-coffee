import IFilterType from './filterType.interface';

export default interface FilterProps {
	setFilterType: ({ title, titleKey }: IFilterType) => void;
	filterType: IFilterType;
};