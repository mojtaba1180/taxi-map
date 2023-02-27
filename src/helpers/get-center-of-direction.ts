
interface Prop {
    points: Array<number>
}


/*
    points: [lat,lon]
*/
export function GetCenterOfDirection({ points }: Prop) {

    const midLat = points.map(item => Number(item[0])).reduce((a, b) => a + b, 0) / points.length;
    const midLng = points.map(item => Number(item[1])).reduce((a, b) => a + b, 0) / points.length;

    return [midLat, midLng]

}