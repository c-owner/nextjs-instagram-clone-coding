export default function TestPage() {
    const obj = [{ categories: ['50만뷰', '정육', '10-20대', '10만이하', '30만 이상'] }];
    const arr = ['10-20대', '10만이하', '20만이상', '30만이하'];
    // const [testArr, setTestArr] = useState([]);
    const testArr: string[] = [];
    /* obj > categories 필터  */
    const { categories } = obj[0];
    categories.filter((category, idx) => {
        if (category === '정육') {
            testArr.push('정육');
        }
        return arr.find((item) => {
            return category === item && testArr.push(category);
        });
    });

    return <>TestPage</>;
}
