export const BASE_URL = 'https://quickserve-api.azurewebsites.net/api/v1';

//Athentication endpoints
export const loginEndpoint = `${BASE_URL}/Accounts/authenticate`;
export const refreshTokenEndpoint = `${BASE_URL}/Accounts/refresh`;
export const registerAccountByAdminEndpoint = `${BASE_URL}/Accounts`;

//User endpoints
export const getAllUsersEndpoint = `${BASE_URL}/Accounts/paged`;
export const getUserByIdEndpoint = `${BASE_URL}/Account`;

//Category endpoints
export const getAllCategoriesEndpoint = `${BASE_URL}/Categories/paged`;
export const createCategoryEndpoint = `${BASE_URL}/Categories`;
export const updateStatusCategoryEndpoint = `${BASE_URL}/Categories`;
export const deleteCategoryEndpoint = `${BASE_URL}//Categories`;
export const renameCategoryEndpoint = `${BASE_URL}/Categories`;


//INGREDIENT endpoints
export const getAllIngredientEndpoint = `${BASE_URL}/Ingredients/paged`;
export const getAllIngredientActiveEndpoint = `${BASE_URL}/Ingredients/pagedByActiveStatus`;
export const getIngredientByIdEndpoint = `${BASE_URL}/Ingredients`;
export const createIngredientEndpoint = `${BASE_URL}/Ingredients`;
export const updateIngredientEndpoint = `${BASE_URL}/Ingredients`;
export const deleteIngredientEndpoint = `${BASE_URL}/Ingredients`;
export const changeImageIngredientEndpoint = `${BASE_URL}/Ingredients`;

//INGREDIENT TYPE ENDPOINTS
export const getAllIngredientTypesEndpoint = `${BASE_URL}/IngredientTypes/paged`;
export const getIngredientTypeByIdEndpoint = `${BASE_URL}/IngredientTypes`;
export const createIngredientTypeEndpoint = `${BASE_URL}/IngredientTypes`;
export const updateStatusIngredientType = `${BASE_URL}/IngredientTypes`;
export const renameIngredientTypeEndpoint = `${BASE_URL}/IngredientTypes`;
export const deleteIngredientTypeEndpoint = `${BASE_URL}/IngredientTypes`;

//Product Template endpoints
export const getAllProductTemplatesEndpoint = `${BASE_URL}/ProductTemplates/paged`;
export const getProductTemplateByIdEndpoint = `${BASE_URL}/ProductTemplates`;
export const createProductTemplateEndpoint = `${BASE_URL}/ProductTemplates`;
export const updateProductTemplateEndpoint = `${BASE_URL}/ProductTemplates`;
export const deleteProductTemplateEndpoint = `${BASE_URL}/ProductTemplates`;
export const changeImageProductTemplateEndpoint = `${BASE_URL}/ProductTemplates`;

//Template Step endpoints
export const getAllTemplateStepsEndpoint = `${BASE_URL}/TemplateSteps/paged`;
export const getTemplateStepByIdEndpoint = `${BASE_URL}/TemplateSteps`;
export const createTemplateStepEndpoint = `${BASE_URL}/IngredientTypeTemplateSteps`;
export const renameTemplateStepEndpoint = `${BASE_URL}/TemplateSteps`;
export const deleteTemplateStepEndpoint = `${BASE_URL}/IngredientTypeTemplateSteps`;

//Store endpoints
export const getAllStoreEndpoint = `${BASE_URL}/Stores/paged`;
export const getStoreByIdEndpoint = `${BASE_URL}/Stores`;
export const createStoreEndpoint = `${BASE_URL}/Stores`;


//Employees endpoints
export const getAllEmployeeEndpoint = `${BASE_URL}/Stores/employees/paged`;
export const createEmployeeEndpoint = `${BASE_URL}/Stores/employees`;

// Ingredient Type Template Steps endpoints
export const getIngredientTypeTemplateStepsEndpoint = `${BASE_URL}/IngredientTypeTemplateSteps/all`;
export const getIngredientTypeTemplateStepByIdEndpoint = `${BASE_URL}/IngredientTypeTemplateSteps`;
export const createIngredientTypeTemplateStepEndpoint = `${BASE_URL}/IngredientTypeTemplateSteps`;
export const updateStatusIngredientTypeTemplateStepEndpoint = `${BASE_URL}/IngredientTypeTemplateSteps`;
export const updateIngredientTypeTemplateStepEndpoint = `${BASE_URL}/IngredientTypeTemplateSteps`;
export const deleteIngredientTypeTemplateStepEndpoint = `${BASE_URL}/IngredientTypeTemplateSteps`;

//Session Endpouints
export const getAllSessionsEndpoint = `${BASE_URL}/Sessions/paged`;
export const getSessionByIdEndpoint = `${BASE_URL}/Sessions`;
export const createSessionEndpoint = `${BASE_URL}/Sessions`;
export const updateSessionEndpoint = `${BASE_URL}/Sessions`;
export const deleteSessionEndpoint = `${BASE_URL}/Sessions`;

//Ingredient Session endpoints
export const getIngredientSessionEndpoint = `${BASE_URL}/IngredientSessions`;
export const createIngredientSessionEndpoint = `${BASE_URL}/IngredientSessions`;
export const updateIngredientSessionEndpoint = `${BASE_URL}/IngredientSessions`;
export const deleteIngredientSessionEndpoint = `${BASE_URL}/IngredientSessions`;
export const clearIngredientSessionEndpoint = `${BASE_URL}/IngredientSessions`;

//Nutrition endpoints
export const getAllNutritionEndpoint = `${BASE_URL}/Nutritions/paged`;
export const getNutritionByIdEndpoint = `${BASE_URL}/Nutritions`;
export const createNutritionEndpoint = `${BASE_URL}/Nutritions`;
export const updateNutritionEndpoint = `${BASE_URL}/Nutritions`;
export const deleteNutritionEndpoint = `${BASE_URL}/Nutritions`;
export const changeImageNutritionEndpoint = `${BASE_URL}/Nutritions`;
export const renameNutritionEndpoint = `${BASE_URL}/Nutritions`;

//Ingredient Nutrition endpoints
export const getIngredientNutritionEndpoint = `${BASE_URL}/IngredientNutritions`;
export const createIngredientNutritionEndpoint = `${BASE_URL}/IngredientNutritions`;
export const updateIngredientNutritionEndpoint = `${BASE_URL}/IngredientNutritions`;
export const deleteIngredientNutritionEndpoint = `${BASE_URL}/IngredientNutritions`;
export const clearIngredientNutritionEndpoint = `${BASE_URL}/IngredientNutritions`;

//Report endpoints
export const getRevenueReportOfStoreEndpoint = `${BASE_URL}/Orders/RevenueReport/Store`;
export const getBestSellingReportOfStoreEndpoint = `${BASE_URL}/Orders/BestSellingProductTemplates/Store`;
export const getBestSellingReportOfBrandEndpoint = `${BASE_URL}/Orders/BestSellingProductTemplates`;
export const getRevenueReportOfAdminEndpoint = `${BASE_URL}/Orders/RevenueReport`;
export const getAccountReportEndpoint = `${BASE_URL}/Accounts/report`;

//Payments
export const getPaymentsEndpoint = `${BASE_URL}/Payments`
export const getPaymentsByStoreEndpoint = `${BASE_URL}/Payments/by-store`

//Orders
export const getOrderListEndpoint = `${BASE_URL}/Orders/OrderList`
export const getOrderListByStoreIdEndpoint = `${BASE_URL}/Orders/OrderListByStoreId`


