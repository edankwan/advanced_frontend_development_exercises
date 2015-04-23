var speakUtils = (function(exports) {

    // verson = 1.0.1

    var undef;

    var _slice = Array.prototype.slice;

    function mixIn(base, args) {
        var i, len, j, target;
        args = _slice.call(arguments, 1);
        for( i = 0, len = args.length; i < len; i++ ) {
            target = args[i];
            for( j in target ) {
                if(target[j] !== undef) {
                    base[j] = target[j];
                }
            }
        }
        return base;
    }

    function bind(func, context, args) {
        args = _slice.call(arguments, 2);
        return function(arg2) {
            args2 = _slice.call(arguments, 0);
            func.apply(context, args.concat(args2));
        };
    }

    function getBustedUrl(url) {
         //not safe but kind of ok
        return url + (url.indexOf('?') > -1 ? '&' : '?') + '=' + (+ new Date);
    }

    function loadAudioFile(url, cb, isBusted, crossOrigin) {
        var audio = document.createElement('audio');
        if(crossOrigin) {
            audio.crossOrigin = crossOrigin === true ? 'Anonymous' : crossOrigin;
        }
        audio.src = url;
        audio.addEventListener('canplaythrough', bind(cb, audio, audio), false);
        audio.load();
    }

    function loadTextFile(url, cb, isBusted, crossOrigin) {
        if(isBusted === undef ? false : isBusted) url = getBustedUrl(url);

        // who cares about old IE :D
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = bind(_onXmlHttpChange, xmlhttp, cb);
        xmlhttp.open('GET', url, true);
        xmlhttp.send(null);
    }

    function loadImage(url, cb, isBusted, crossOrigin) {
        if(isBusted === undef ? false : isBusted) url = getBustedUrl(url);

        var img = new Image();
        if(crossOrigin) {
            img.crossOrigin = crossOrigin === true ? 'Anonymous' : crossOrigin;
        }
        img.src = url;
        if(img.width) {
            cb(img, img);
        } else {
            img.onload = bind(cb, img, img);
        }
    }

    function _onXmlHttpChange(cb) {
        if (this.readyState == 4) {
            if (this.status == 200) {
                cb(this.responseText);
            } else {
                console.error('not working');
            }
        }
    }

    // items: [{url: string, type: string}]
    function preload(items, onLoading, isBusted) {
        var item, func;
        items.contents = items.contents = {};
        for(var i = 0, len = items.length; i < len; i++) {
            item = items[i];
            switch(item.type) {
                case 'text':
                    func = loadTextFile;
                    break;
                case 'image':
                    func = loadImage;
                    break;
                case 'audio':
                    func = loadAudioFile;
                    break;
                default:
                    console.error('type missing');
                    break;
            }
            func(item.url, bind(_onItemLoad, items, onLoading, i), isBusted || item.isBusted, item.crossOrigin);
        }
    }

    function _onItemLoad(onLoading, index, content) {
        var item = this[index];
        item.content = content;
        item.isLoaded = true;
        this.contents[item.id === undef ? item.url : item.id] = content;
        var loadedCount = 0;
        for(var i = 0, len = this.length; i < len; i++) {
            if(this[i].isLoaded) loadedCount++;
        }
        onLoading(loadedCount / len, this);
    }

    function addImageDropListener(target, cb) {
        target.addEventListener('dragover', _preventDefault);
        target.addEventListener('drop', bind(_onImageDrop, target, cb));
    }

    function _preventDefault(evt) {
        evt.preventDefault();
    }

    function _onImageDrop(cb, evt) {
        evt.preventDefault();
        var files = evt.dataTransfer.files;
        var i = files.length;
        while(i--) {
            if(files[i].type.indexOf('image') == -1) {
                [].splice.call(files, i, 1);
            }
        }
        if(files.length == 1) {
            reader = new FileReader();
            reader.onload = bind(_onImageDropDataURLLoad, reader, cb);
            reader.readAsDataURL(files[0]);
        }
    }

    function _onImageDropDataURLLoad(cb, evt){
        var img = new Image();
        img.src = evt.target.result;
        if(img.width) {
            cb.call(img);
        } else {
            img.onload = cb;
        }
    }

    exports.mixIn = mixIn;
    exports.bind = bind;
    exports.loadTextFile = loadTextFile;
    exports.loadImage = loadImage;
    exports.preload = preload;
    exports.addImageDropListener = addImageDropListener;

    return exports;

}({}));
