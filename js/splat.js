import * as SPLAT from 'https://cdn.jsdelivr.net/npm/gsplat@latest';

const canvas = document.getElementById('splat-canvas');
const renderer = new SPLAT.WebGLRenderer(canvas);
const scene = new SPLAT.Scene();
const camera = new SPLAT.Camera();

// Set transparent background
renderer.backgroundColor = new SPLAT.Color32(0, 0, 0, 0);

async function main() {
    const url = '/js/me.splat';
    const object = await SPLAT.Loader.LoadAsync(url, scene, () => {});

    // Try to get bounding box from the loaded object
    if (object && object.boundingBox && object.boundingBox.center) {
        const center = object.boundingBox.center;
        object.position = new SPLAT.Vector3(-center.x, -center.y, -center.z);
    }

    const handleResize = () => {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    let angle = 0;
    
    const frame = () => {
        angle += 0.01;
        
        // Rotate the object
        if (object && object.rotation) {
            object.rotation = SPLAT.Quaternion.FromEuler(
                new SPLAT.Vector3(0, angle, 0)
            );
        }
        
        renderer.render(scene, camera);
        requestAnimationFrame(frame);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    requestAnimationFrame(frame);
}

main();