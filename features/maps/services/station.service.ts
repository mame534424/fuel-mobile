import api from "@/services/api";
export const getNearbyStations = async (latitude: number, longitude: number) => {
    try {
        const response = await api.get("/stations/nearby", {
            params: {
                latitude,
                longitude,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching nearby stations:", error);
        throw error;
    }
}
export const getStationStatus = async (stationId: string) => {
    try {
        const response = await api.get(`/user/stats/${stationId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching station status:", error);
        throw error;
    }
}