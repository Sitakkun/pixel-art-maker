import React,{ useState } from 'react';

//Propsの型定義
type Props = {
    pixel: number
}

//cssカラーリストの読み取り
let csscolors = require('css-color-names');

//キーを含んだ配列に変換
let array = Object.keys(csscolors).map((k) => (
    ({ key: k, value: csscolors[k]})
));

// hexコード順に並び替える。(明→暗の順番)
array.sort(function(a,b) {
    const aHex:number = parseInt(a.value.substring(1,3),16) + parseInt(a.value.substring(3,5),16) + parseInt(a.value.substring(5),16);
    const bHex:number = parseInt(b.value.substring(1,3),16) + parseInt(b.value.substring(3,5),16) + parseInt(b.value.substring(5),16);
    if(aHex > bHex) {
        return -1;
    } else {
        return 1
    }
});

//連想配列に再変換
csscolors = Object.assign({}, ...array.map((item) => ({
    [item.key]: item.value,
})));


const PixelArt: React.VFC<Props> = ({ pixel }) => {
    const[currentColor,setCurrentColor] = useState("red");
    let lastID = 0;

    const table = [];

    // PixelArtテーブル作成用の配列を生成する。
    for(let rowNum = 0; rowNum < pixel; rowNum++){
        const row:number[] = [];
        table.push(row)
        for(let columnNum = 0; columnNum < pixel; columnNum++) {
            row.push(columnNum);
        }
    }

    // PixelArtテーブルのセルクリック時のハンドラー
    const clickPixcel = (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
        const elem = document.getElementById(event.currentTarget.id);
        if(elem) {
            elem.style.backgroundColor = currentColor;
        }
        
    }

    // カラーパレットクリック時のハンドラー
    const changeColor = (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
        setCurrentColor(event.currentTarget.id);
    }

    // input color から値を取得
    const changeColorFromInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentColor(event.target.value);
        const pickColorList = document.getElementById("color-list");
        const colorData = document.createElement("option");
        colorData.setAttribute("value",event.target.value);
        pickColorList?.appendChild(colorData);
    }

    //PixelArtテーブルの<td>にIDを付与するために利用。
    const newID = () => {
        const id:string = "row" + lastID;
        lastID++;
        return id;
    }

    //cssカラーの連想配列からカラーパレットを作成する。
    const createColorPallet = () => {
        let tds = [];
        const trs = [];
        let cnt:number = 0;
        for(let key in csscolors) {
            tds.push(<td id={key} style={{backgroundColor: key}} onClick={changeColor}></td>);
            cnt++;
            if(cnt === 16) {
                trs.push(<tr>{ tds }</tr>)
                tds = [];
                cnt = 0;
            }
        }
        trs.push(<tr>{ tds }</tr>)
        return trs;
    }

    return(
        <>
        <div className="table-container">
            <table id="pixcelArtTable">
                <tbody>
                    {table.map(columns => (
                        <tr>
                            {columns.map(column => (
                                <td onClick={clickPixcel} id={newID()}></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="color-selector">
            <h2>カラーパレット</h2>
            <table className="colorSelectorTable">
                <tbody>
                    { createColorPallet() }
                </tbody>
            </table>
            <table className="currentColorTable">
                <tbody>
                    <tr>
                        <td colSpan={5} style={{width: '250px'}}>選択している色：{ currentColor }</td>
                        <td style={{backgroundColor: currentColor}}></td>
                    </tr>
                </tbody>
            </table>
            <input type="color" name="colorPicker" list="color-list" onBlur={ changeColorFromInput }/>
            <datalist id="color-list">
                <option value="#ff0000"></option>
                <option value="#00ff00"></option>
                <option value="#0000ff"></option>
                <option value="red"></option>
            </datalist>
        </div>
        </>
    )
}

export default PixelArt;