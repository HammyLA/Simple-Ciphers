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
    for (var i = 0; i < CipherList.length; i++) {
        for (var j = 0; j < CipherList[i].cipher.length; j++) {
            cipherList.push(CipherList[i].cipher[j])
        }
    }

    useEffect(() => {
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
    }, [cipherList])

    function getCipherStats(cipherName: string, cipherStats: any) {
        let encrypt = 0;
        let decrypt = 0;
        try {
            for (var i = 0; i < cipherList.length; i++) {
                const cipher = cipherStats[i]
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
