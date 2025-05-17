import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { parse, resolve } from "path";
import fs from "fs";
// eslint-disable-next-line no-undef
let dirName = __dirname;
const Pages = resolve(dirName, "src", "Pages");
const Langs = resolve(dirName, "src", "lang");
const Utility = resolve(dirName, "src", "Utility");
const GeneratedDateBuildId = new Date().getTime();

function GetFilenamesWithoutExtensions(arr) {
    let allFiles = [];
    fs.readdirSync(arr).forEach((file) => {
        allFiles.push(parse(file).name);
    });
    return allFiles?.filter((f) => !f?.startsWith("_"));
}
const LanguagesFiles = GetFilenamesWithoutExtensions(Langs);
const UtilityFiles = GetFilenamesWithoutExtensions(Utility);
const PagesFiles = GetFilenamesWithoutExtensions(Pages);
const WriteBuildIdJson = () => {
    fs.writeFileSync(
        resolve(dirName, "public", "buildId.txt"),
        JSON.stringify(GeneratedDateBuildId)
    );
};
WriteBuildIdJson();
export default defineConfig({
    resolve: {
        alias: {
            "@": "/src"
        }
    },
    server: {
        port: 3000,
        host: true
    },
    preview: {
        port: 3000,
        host: true
    },
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 5120,
        outDir: "dist",
        // emitAssets : true,
        // minify: false,
        // sourcemap: true,
        target: "esnext",
        manifest: false,
        sourcemap: false,
        // emptyOutDir: true,
        rollupOptions: {
            input: {
                index: resolve(dirName, "index.html"),
                Auth: resolve(Pages, "Auth"),
                Data: resolve(Pages, "Data"),
                Detail: resolve(Pages, "Detail"),
                Error404: resolve(Pages, "Error404"),
                Settings: resolve(Pages, "Settings"),
                // "dashbaord": resolve(Pages, "Dashbaord"),
                // Langs
                ar: resolve(Langs, "ar.js"),
                en: resolve(Langs, "en.js"),
                // Utility
                Helper: resolve(Utility, "Helper.js"),
                RoutingManager: resolve(Utility, "RoutingManager.js"),
                StateHelper: resolve(Utility, "StateHelper.js"),
                BodyHelper: resolve(Utility, "BodyHelper.js"),
                Validtion: resolve(Utility, "Validtion.js"),
                WebSocketController: resolve(Utility, "WebSocketController.js")
            },
            output: [
                {
                    format: "esm",
                    entryFileNames: (chunkInfo) => {
                        const FileName = chunkInfo.name;
                        if (PagesFiles.includes(FileName)) {
                            return `${GeneratedDateBuildId}/Pages/${FileName}.js`;
                        }
                        if (LanguagesFiles.includes(FileName)) {
                            return `${GeneratedDateBuildId}/Lang/${FileName}.js`;
                        }
                        if (UtilityFiles.includes(FileName)) {
                            return `${GeneratedDateBuildId}/Utility/${FileName}.js`;
                        }
                        return `${GeneratedDateBuildId}/Chunks/${FileName}.js`;
                    },
                    assetFileNames: `${GeneratedDateBuildId}/Assets/[name].[ext]`,
                    chunkFileNames: ({ name: FileName }) => {
                        return `${GeneratedDateBuildId}/Libs/${FileName}.js`;
                    },

                    extend: true
                }
            ]
        }
    }
});
