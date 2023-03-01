
const AddressStringFilter = (text) => {
        const arr = text.split(",").reverse();
        let address = "";
       arr.forEach(function (str) {
            str = str.trim();
            if (str.match(/^ایران$/)) return;
            if (str.match(/^\d{5}-\d{5}$/)) return;
            if (str.match(/^استان .*$/)) return;
            if (str.match(/^شهرستان .*$/)) return;
            if (str.match(/^بخش .*$/)) return;
            if (address !== '') address = address + '، ';
            address = address + str;
        });

        return address

}

export default AddressStringFilter