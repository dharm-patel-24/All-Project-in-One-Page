const express = require('express'); 

const router = express.Router(); 

const {homePage, dynamicTable, kukuCube, ticTacToe, allEvents, pagination, attendance_report, result_table, one_std_result, rglr_search, get_data_rglr_search, filter, searchById, getSearchedDataById, searchByIdShowMore, searchbyANDOR} = require('../controller/controller')

router.get('/', homePage);

router.get('/dynamic-table', dynamicTable);

router.get('/kuku-cube', kukuCube);

router.get('/tic-tac-toe', ticTacToe);

router.get('/all-events', allEvents);

router.get('/pagination', pagination);

router.get('/attendance-report', attendance_report);

router.get('/result-report', result_table);

router.get('/one-std-result', one_std_result);

router.get('/rglr-search', rglr_search);

router.get('/rglr-search-data', get_data_rglr_search);

router.post('/rglr-search-data', get_data_rglr_search);

router.get('/filter', filter);

router.get('/search-by-id', searchById);

router.post('/get-searched-data-by-id', getSearchedDataById);

router.get('/search-by-id-showMore', searchByIdShowMore);

router.post('/search-by-AND-OR', searchbyANDOR);

module.exports = router;