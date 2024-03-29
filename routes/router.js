const express = require('express'); 

const router = express.Router(); 

const {homePage, dynamicTable, kukuCube, ticTacToe, allEvents, pagination, attendance_report, result_table, one_std_result, rglr_search, get_data_rglr_search, filter, searchById, getSearchedDataById, searchByIdShowMore, searchbyANDOR, delimiterSearch, delimiterSearchResult, formValidation, formValidationUpdate, formValidationUpdateData, formValidationInsert, fetchPosts, fetchShowMore, stepForm, state, stepFormSubmit, getDataStepForm, updateStepForm, timeConverter, registrationForm, registrationFormSubmit, activated, passwordSubmit, login, homePagePost, homePageGet, forgot, email, expire, regenerated, authentication, logout, cssOne, csstwo, cssthree,} = require('../controller/controller')

router.get('/ehys-css-task-1', authentication, cssOne);

router.get('/awanHoster-css-task-2', authentication, csstwo);

router.get('/hireX-css-task-3', authentication, cssthree);

router.get('/homePage', authentication, homePage);

router.get('/dynamic-table', authentication, dynamicTable);

router.get('/kuku-cube', authentication, kukuCube);

router.get('/tic-tac-toe', authentication, ticTacToe);

router.get('/all-events', authentication, allEvents);

router.get('/pagination', authentication, pagination);

router.get('/attendance-report', authentication, attendance_report);

router.get('/result-report', authentication, result_table);

router.get('/one-std-result', authentication, one_std_result);

router.get('/rglr-search', authentication, rglr_search);

router.get('/rglr-search-data', authentication, get_data_rglr_search);

router.post('/rglr-search-data', authentication, get_data_rglr_search);

router.get('/filter', authentication, filter);

router.get('/search-by-id', authentication, searchById);

router.post('/get-searched-data-by-id', authentication, getSearchedDataById);

router.get('/search-by-id-showMore', authentication, searchByIdShowMore);

router.post('/search-by-AND-OR', authentication, searchbyANDOR);

router.get('/delimiter-search', authentication, delimiterSearch);

router.post('/delimiter-search-result', authentication, delimiterSearchResult);

router.get('/form-validation', authentication, formValidation);

router.get('/form-validation-update/:id', authentication, formValidationUpdate);

router.post('/form-validation-update/:id', authentication, formValidationUpdateData);

router.post('/submit', authentication, formValidationInsert);

router.get('/posts-fetch', authentication, fetchPosts);

router.get('/posts-fetch-showMore/:id', authentication, fetchShowMore);

router.get('/stepForm', authentication, stepForm);

router.get('/getAllStates', authentication, state);

router.post('/submitstepForm', authentication, stepFormSubmit);

router.get('/stepForm-update/:id', authentication, getDataStepForm);

router.post('/stepForm-update/:id', authentication, updateStepForm);

router.get('/timeZone-converter', authentication, timeConverter);

router.get('/', registrationForm);

router.post('/registration-form-submit', registrationFormSubmit);

router.get('/activated/:id', activated);

router.post('/passwordSubmit', passwordSubmit);

router.get('/login', login);

router.post('/homePage', homePagePost);

router.get('/homePage', homePageGet);

router.get('/forgot', forgot);

router.post('/email', email);

router.get('/expire', expire);

router.get('/regenerated', regenerated);

router.get('/logout', logout);

module.exports = router;