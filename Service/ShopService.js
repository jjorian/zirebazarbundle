export const getShopList = async (uid, type) => {
    try {
        const response = await fetch(
            "http://192.168.1.26:59861/api/v1/Shop/Get/" + uid + "/" + type,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            throw new Error("بنظر میرسد مشکلی بوجود آمده است");
        }
        const resData = await response.json();
        return resData;
    }
    catch (error) {
        throw error;
    }
};
export const getShopInfo = async (sid) => {
    try {
        const response = await fetch(
            "http://192.168.1.26:59861/api/v1/Shop/Get/" + sid,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            throw new Error("بنظر میرسد مشکلی بوجود آمده است");
        }
        const resData = await response.json();
        return resData;
    }
    catch (error) {
        throw error;
    }
};
export const getProductList = async (sid, catid, query) => {

    {
        try {
            const response = await fetch(
                "http://192.168.1.26:59861/api/v1/Product/Get/Shop/" + sid + "/" + catid + "/" + query,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("بنظر میرسد مشکلی بوجود آمده است");
            }
            const resData = await response.json();
            return resData;
        }
        catch (error) {
            throw error;
        }
    };
};
