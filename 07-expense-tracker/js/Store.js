

export const store = {

    get: (key, fb = null) => {
        try {
            const v = localStorage.getItem(key);
            return v ? JSON.parse(v) : fb;
        }

        catch {
            return fb;
        }

    },

    set: (key, val) => {
        try {

            localStorage.setItem(key, JSON.stringify(val));

        } catch { }
    }
}