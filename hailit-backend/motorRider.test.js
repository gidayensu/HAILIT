const { getAllRiders, getOneRider, addMotorRider, updateRider, deleteRider } = require('./src/model/motorRider.model'); // replace 'yourFileName' with the actual file name
const dbFunctions = require('./src/model/dBFunctions');

jest.mock('./dBFunctions');

describe('Rider functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getAllRiders should return all riders', async () => {
        const mockData = [{ rider_id: '1', vehicle_id: '2', user_id: '3' }];
        dbFunctions.getAll.mockResolvedValue(mockData);
        const result = await getAllRiders();
        expect(result).toEqual(mockData);
    });

    test('getOneRider should return one rider', async () => {
        const mockData = { rider_id: '1', vehicle_id: '2', user_id: '3' };
        dbFunctions.getOne.mockResolvedValue(mockData);
        const result = await getOneRider('1');
        expect(result).toEqual(mockData);
    });

    test('addMotorRider should add a rider', async () => {
        dbFunctions.addOne.mockResolvedValue(true);
        const result = await addMotorRider('3');
        expect(result).toBe(true);
    });

    test('updateRider should update a rider', async () => {
        const mockData = { rider_id: '1', vehicle_id: '2', user_id: '3' };
        dbFunctions.updateOne.mockResolvedValue(mockData);
        const result = await updateRider(mockData);
        expect(result).toEqual(mockData);
    });

    test('deleteRider should delete a rider', async () => {
        dbFunctions.deleteOne.mockResolvedValue(true);
        const result = await deleteRider('1');
        expect(result).toBe(true);
    });
});
