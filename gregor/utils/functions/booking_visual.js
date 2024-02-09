function calculateTotalHours(startTime, endTime) {
    const start = new Date(`1970-01-01T${startTime.split("T")[1]}`);
    const end = new Date(`1970-01-01T${endTime.split("T")[1]}`);
    const timeDifference = end - start;

    // Convert milliseconds to hours
    const totalHours = timeDifference / (1000 * 60 * 60);

    return totalHours;
}


function removeDuplicateAndKeepOne(array) {
    const uniqueMap = {};
    const resultArray = [];

    array.forEach((obj) => {
        const key = `${obj.resourceId}_${obj.start}_${obj.end}`;
        if (!uniqueMap[key] || uniqueMap[key]._id < obj._id) {
            uniqueMap[key] = obj;
        }
    });

    // Convert the uniqueMap object back to an array
    for (const key in uniqueMap) {
        resultArray.push(uniqueMap[key]);
    }

    return resultArray;
}





function removeDuplicateObjects(array) {
    // Helper function to check object equality
    const areObjectsEqual = (obj1, obj2) => {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    };

    // Use filter to create a new array with unique objects
    const uniqueArray = array.filter((value, index, self) => {
        return self.findIndex((obj) => areObjectsEqual(obj, value)) === index;
    });

    return uniqueArray;
}


const check_before_pushing = (obj, arr) => {
    if (arr.some(e => e._id === obj._id)) {

        const same = arr.filter(e => e._id === obj._id);



        let highest_id = same.reduce((first, second) => {
            if (second.resourceId && parseInt(second.resourceId.split("-")[1]) > parseInt(first.resourceId.split("-")[1])) {
                return second;
            } else {
                return first
            }
        }, same[0]);

        let obj_count = parseInt(highest_id.resourceId.split("-")[1]);

        return same.length !== obj_count;
    } else {
        return true
    }

};




export default function booking_visuals(array) {
    const resultArray = [];
    let jack_array = [];
    let hour_1_array = [];

    array.forEach(obj => {

        if (calculateTotalHours(obj.start, obj.end) === 1) {

            const hour_1_obj_1 = { ...obj, resourceId: "player-1" }
            const hour_1_obj_2 = { ...obj, resourceId: "player-2" }
            const hour_1_obj_3 = { ...obj, resourceId: "player-3" }
            const hour_1_obj_4 = { ...obj, resourceId: "player-4" }

            hour_1_array.push(hour_1_obj_1);
            hour_1_array.push(hour_1_obj_2);
            hour_1_array.push(hour_1_obj_3);
            hour_1_array.push(hour_1_obj_4);
        } else {
            const match = array.filter(o => o.start === obj.start && o.end === obj.end);
            if (match.length) {
                match.forEach(object => {
                    const matchedId = match.filter(e => e.resourceId === object.resourceId);
                    const unmatchedId = match.filter(e => e.resourceId !== object.resourceId);

                    if (matchedId.length) {
                        if (matchedId.every(m => parseInt(m.resourceId.split("-")[1]) > 1)) {

                            const id_player_2_1_1 = { ...matchedId[0], resourceId: "player-1" };
                            const id_player_2_1_2 = { ...matchedId[0], resourceId: "player-2" };
                            const id_player_2_2_1 = { ...matchedId[1], resourceId: "player-3" }
                            const id_player_2_2_2 = { ...matchedId[1], resourceId: "player-4" }


                            if (check_before_pushing(id_player_2_1_1, resultArray)) {

                                if (Object.keys(id_player_2_1_1).length > 1) {
                                    jack_array.push(id_player_2_1_1);

                                }
                                if (Object.keys(id_player_2_1_2).length > 1) {
                                    jack_array.push(id_player_2_1_2);

                                }

                                if (Object.keys(id_player_2_2_1).length > 1) {
                                    jack_array.push(id_player_2_2_1);

                                }

                                if (Object.keys(id_player_2_2_2).length > 1) {
                                    jack_array.push(id_player_2_2_2);

                                }
                            }

                        } else {
                            const id_player_2_1 = { ...matchedId[0], resourceId: "player-1" };
                            const id_player_2_2 = { ...matchedId[1], resourceId: "player-2" };



                            if (check_before_pushing(id_player_2_1, resultArray)) {
                                if (Object.keys(id_player_2_1).length > 1) resultArray.push(id_player_2_1);
                            }
                            if (check_before_pushing(id_player_2_2, resultArray)) {
                                if (Object.keys(id_player_2_2).length > 1) {
                                    resultArray.push(id_player_2_2);

                                }
                            }
                        }

                    }

                    if (unmatchedId.length) {


                        var updated_lowest_id;

                        if (unmatchedId[0].resourceId === "player-1") {
                            updated_lowest_id = { ...unmatchedId[0], resourceId: "player-4" }
                            if (check_before_pushing(updated_lowest_id, resultArray)) {
                                resultArray.push(updated_lowest_id);

                            }
                        } else {

                            const highestResourceIdCount = parseInt(unmatchedId[0].resourceId.split('-')[1]);


                            for (let i = highestResourceIdCount; i > 0; i--) {
                                const newObj = { ...obj, resourceId: `player-${i + 1}` };
                                if (check_before_pushing(newObj, resultArray)) resultArray.push(newObj);

                            }
                        }
                    }
                })
            } else {

                const resourceIdCount = parseInt(obj.resourceId.split('-')[1]);

                for (let i = resourceIdCount; i > 0; i--) {
                    const newObj = { ...obj, resourceId: `player-${i}` };
                    resultArray.push(newObj);
                }
            }
        }

    });


    const fresh_array = removeDuplicateAndKeepOne(removeDuplicateObjects(resultArray.concat(jack_array)));
    return fresh_array.concat(hour_1_array);
};



