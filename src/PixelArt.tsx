import React,{ useState } from 'react';

//Propsの型定義
type Props = {
    pixel: number
}

const csscolors = require('css-color-names');

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
        </div>
        </>
    )
}

export default PixelArt;