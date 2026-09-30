"use client";

export interface StudioRecordingTake {
  id: string;
  title: string;
  blob: Blob;
  type: "video" | "audio";
  mimeType: string;
  durationSeconds: number;
  durationFormatted: string;
  createdAt: string;
  notes?: string;
  instrument?: string;
}

const DB_NAME = "gandharva_music_studio_db";
const STORE_NAME = "studio_recordings";
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB is not supported in this environment."));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error || new Error("Failed to open IndexedDB"));
    };
  });
}

export async function saveStudioRecording(take: StudioRecordingTake): Promise<string> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(take);

      req.onsuccess = () => {
        resolve(take.id);
      };
      req.onerror = () => {
        reject(req.error || new Error("Failed to save recording take."));
      };
    });
  } catch (err) {
    console.error("IndexedDB save error:", err);
    throw err;
  }
}

export async function getStudioRecordings(): Promise<StudioRecordingTake[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const results = (req.result as StudioRecordingTake[]) || [];
        // Sort descending by creation date
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        resolve(results);
      };
      req.onerror = () => {
        reject(req.error || new Error("Failed to fetch recordings."));
      };
    });
  } catch (err) {
    console.warn("IndexedDB get error, returning empty list:", err);
    return [];
  }
}

export async function deleteStudioRecording(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error || new Error("Failed to delete recording."));
    });
  } catch (err) {
    console.error("IndexedDB delete error:", err);
    throw err;
  }
}

export async function updateStudioRecordingNotes(
  id: string,
  notes: string,
  title?: string,
): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get(id);

      getReq.onsuccess = () => {
        const take = getReq.result as StudioRecordingTake;
        if (!take) {
          reject(new Error("Recording take not found."));
          return;
        }

        take.notes = notes;
        if (title && title.trim()) {
          take.title = title.trim();
        }

        const putReq = store.put(take);
        putReq.onsuccess = () => resolve();
        putReq.onerror = () => reject(putReq.error);
      };

      getReq.onerror = () => reject(getReq.error);
    });
  } catch (err) {
    console.error("IndexedDB update error:", err);
    throw err;
  }
}
