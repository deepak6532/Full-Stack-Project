const generateBookingId = (): string => {
    const num = Math.floor(10000 + Math.random() * 90000);
    return `SCR-${num}`;
};

export default generateBookingId;
