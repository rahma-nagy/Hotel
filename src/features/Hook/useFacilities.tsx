import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { facilitiesRoomsUrl } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const useFacilities = () => {
    const { requestHeaders } = useContext(AuthContext);
    const [facilitiesList, setFacilitiesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const getAllFacilities = (size = 1, pageNo = 10) => {
        setLoading(true);

        axios
            .get(`${facilitiesRoomsUrl}`, {
                headers: requestHeaders,
            })
            .then((response) => {
                setFacilitiesList(response?.data?.data?.facilities);
                setLoading(false);
               
            })
            .catch((error) => {
                setLoading(false);
            });
    };
    useEffect(() => {
        getAllFacilities(currentPage, rowsPerPage);
    }, [currentPage, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1); // Reset to the first page when changing rows per page
    };

    return { facilitiesList, loading, handleChangePage, handleChangeRowsPerPage };
};

export default useFacilities;