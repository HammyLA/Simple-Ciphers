import { useEffect, useState } from 'react';
import CipherList from '../components/CipherList';
import '../styles/Information.css'
import { getError } from '../components/Helper';


interface Cipher {
    id: number,
    cipher: string,
    encrypts: number,
    decrypts: number
}

function Stats() {
    const cipherList = [];
    const [cipherStats, setCipherStats] = useState([])
    const [awake, setAwake] = useState();
    for (var i = 0; i < CipherList.length; i++) {
        for (var j = 0; j < CipherList[i].cipher.length; j++) {
            cipherList.push(CipherList[i].cipher[j])
        }
    }

    useEffect(() => {
        try {
            const checkAwake = async () => {
                const response = await fetch(import.meta.env.VITE_API_BASE + '/', {
                    method: "GET"
                })
                const awakeData = await response.json()
                setAwake(awakeData.message)
                console.log(awakeData.message)
            }
            checkAwake()
        }
        catch (err) {
            getError(err)
        }

        if (!awake) {
            try {
                const fetchStats = async () => {
                    const response = await fetch(import.meta.env.VITE_API_BASE + '/globalstats', {
                        method: "GET"
                    })
                    const cipherData = await response.json()
                    setCipherStats(cipherData)
                }
                fetchStats()
            } catch (err) {
                getError(err)
            }
        }
    }, [])

    function getCipherStats(cipherName: string, cipherStats: any) {
        let encrypt = 0;
        let decrypt = 0;
        try {
            for (var i = 0; i < cipherList.length; i++) {
                const cipher: Cipher = cipherStats[i]
                if (cipherName === cipher.cipher) {
                    encrypt = cipher.encrypts
                    decrypt = cipher.decrypts
                }

            }
        } catch (err) {
            getError(err)
        }
        return (
            <>
                <td>{encrypt}</td>
                <td>{decrypt}</td>
            </>
        )
    }

    if (!awake) {
        return (
            <div className="connecting">
                <h1> Please Wait... </h1>
                <h3> Connecting to the Server... </h3>
            </div>
        )
    }

    return (
        <>
            <p className='informationHead'>{"> Statistics"}</p>
            <div className="information">
                <div>
                    <h1 className='offsetText'>Global Statistics</h1>
                </div>
                <div>
                    <table>
                        <thead id='headerRow'>
                            <tr>
                                <th>Ciphers</th>
                                <th>Encryptions</th>
                                <th>Decryptions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cipherList.map((cipher) => {
                                return (
                                    <tr key={cipher.id}>
                                        <td>{cipher.name}</td>
                                        {getCipherStats(cipher.name, cipherStats)}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}

export default Stats
