import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

export default class Database {
    initDB() {
        let db;
        return new Promise((resolve) => {
            console.log("Plugin integrity check ...");
            SQLite.echoTest().then(() => {
                    console.log("Integrity check passed ...");
                    console.log("Opening database ...");
                    SQLite.openDatabase({name : "Kata.db", createFromLocation : "~Kata.db"})
                        .then(DB => {
                            db = DB;
                            console.log("Database OPEN");
                            db.executeSql('SELECT 1 FROM KataTidakBaku LIMIT 1').then(() => {
                                console.log("Database is ready ... executing query ...");
                            })
                            // .catch((error) => {
                            //     console.log("Received error: ", error);
                            //     console.log("Database not yet ready ... populating data");
                            //     db.transaction((tx) => {
                            //         tx.executeSql('CREATE TABLE IF NOT EXISTS KataTidakBaku (kbId, ktb, kb)');
                            //     }).then(() => {
                            //         console.log("Table created successfully");
                            //     }).catch(error => {
                            //         console.log(error);
                            //     });
                            // });
                            resolve(db);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log("echoTest failed - plugin not functional");
                });
        });
    };
    closeDatabase(db) {
        if (db) {
            console.log("Closing DB");
            db.close()
                .then(status => {
                    console.log("Database CLOSED");
                })
                .catch(error => {
                    this.errorCB(error);
                });
        } else {
            console.log("Database was not OPENED");
        }
    };
    listKataTidakBaku() {
        return new Promise((resolve) => {
            const ListKata = [];
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM KataTidakBaku', []).then(([tx, results]) => {
                        console.log("Query completed");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            console.log(`Kata ID: ${row.kbId}, Kata Tidak Baku: ${row.ktb}, Kata Baku: ${row.kb}`)
                            const { kbId, ktb, kb } = row;
                            ListKata.push({
                                kbId,
                                ktb,
                                kb
                            });
                        }
                        console.log(ListKata);
                        resolve(ListKata);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    findKataTidakBakuById(id) {
        console.log(id);
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM KataTidakBaku WHERE kbId = ?', [id]).then(([tx, results]) => {
                        console.log(results);
                        if (results.rows.length > 0) {
                            let row = results.rows.item(0);
                            resolve(row);
                        }
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    findKataTidakBaku(val) {
        // console.log(val);
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM KataTidakBaku WHERE ktb like ?', [val]).then(([tx, results]) => {
                        // console.warn(results);
                        if (results.rows.length > 0) {
                            let row = results.rows.item(0);
                            resolve(row);
                        }else{
                            resolve('');
                        }
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.warn(err);
                });
            }).catch((err) => {
                console.warn(err);
            });
        });
    }
    findKataTidakBaku2(val1,val2) {
        // console.log(val);
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM KataTidakBaku WHERE ktb like ?', [val1+" "+val2]).then(([tx, results]) => {
                        // console.warn(results);
                        if (results.rows.length > 0) {
                            let row = results.rows.item(0);
                            resolve(row);
                        }else{
                            resolve('');
                        }
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.warn(err);
                });
            }).catch((err) => {
                console.warn(err);
            });
        });
    }
    addKataTidakBaku(k) {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO KataTidakBaku VALUES (?, ?, ?)', [null, k.ktb.toLowerCase(), k.kb.toLowerCase()]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    updateKataTidakBaku(id, k) {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('UPDATE KataTidakBaku SET ktb = ?, kb = ? WHERE kbId = ?', [k.ktb.toLowerCase(), k.kb.toLowerCase(), id]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    deleteKataTidakBaku(id) {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('DELETE FROM KataTidakBaku WHERE kbId = ?', [id]).then(([tx, results]) => {
                        console.log(results);
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
}