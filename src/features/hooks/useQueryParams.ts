import { useNavigate, useLocation } from 'react-router-dom';

export function useQueryParams() {
    const navigate = useNavigate();
    const location = useLocation();

    const setSearchParam = (param: string, value: string) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(param, value);
        navigate({ ...location, search: searchParams.toString() });
    };

    return { setSearchParam };
}