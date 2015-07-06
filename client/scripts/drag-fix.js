'use strict';
module.exports = function() {
    console.log('fixing drag gestures');
    ionic.Gestures.gestures.Drag.handler = function dragGesture(ev, inst) {
        console.log('dragGesture() with drag-fix');
        if(ev.srcEvent.type == 'touchstart' || ev.srcEvent.type == 'touchend') {
            this.preventedFirstMove = false;

        } else if(!this.preventedFirstMove && ev.srcEvent.type == 'touchmove') {
            // Prevent gestures that are not intended for this event handler from firing subsequent times
            if(inst.options.prevent_default_directions.length > 0 && inst.options.prevent_default_directions.indexOf(ev.direction) != -1) {
                console.log('ev.preventDefault being called', ev);
                ev.srcEvent.preventDefault();
            }
            this.preventedFirstMove = true;
        }

        // current gesture isnt drag, but dragged is true
        // this means an other gesture is busy. now call dragend
        if(ionic.Gestures.detection.current.name != this.name && this.triggered) {
            inst.trigger(this.name + 'end', ev);
            this.triggered = false;
            return;
        }

        // max touches
        if(inst.options.drag_max_touches > 0 &&
            ev.touches.length > inst.options.drag_max_touches) {
            return;
        }

        switch(ev.eventType) {
            case ionic.Gestures.EVENT_START:
                this.triggered = false;
                break;

            case ionic.Gestures.EVENT_MOVE:
                // when the distance we moved is too small we skip this gesture
                // or we can be already in dragging
                if(ev.distance < inst.options.drag_min_distance &&
                    ionic.Gestures.detection.current.name != this.name) {
                    return;
                }

                // we are dragging!
                if(ionic.Gestures.detection.current.name != this.name) {
                    ionic.Gestures.detection.current.name = this.name;
                    if(inst.options.correct_for_drag_min_distance) {
                        // When a drag is triggered, set the event center to drag_min_distance pixels from the original event center.
                        // Without this correction, the dragged distance would jumpstart at drag_min_distance pixels instead of at 0.
                        // It might be useful to save the original start point somewhere
                        var factor = Math.abs(inst.options.drag_min_distance / ev.distance);
                        ionic.Gestures.detection.current.startEvent.center.pageX += ev.deltaX * factor;
                        ionic.Gestures.detection.current.startEvent.center.pageY += ev.deltaY * factor;

                        // recalculate event data using new start point
                        ev = ionic.Gestures.detection.extendEventData(ev);
                    }
                }

                // lock drag to axis?
                if(ionic.Gestures.detection.current.lastEvent.drag_locked_to_axis || (inst.options.drag_lock_to_axis && inst.options.drag_lock_min_distance <= ev.distance)) {
                    ev.drag_locked_to_axis = true;
                }
                var last_direction = ionic.Gestures.detection.current.lastEvent.direction;
                if(ev.drag_locked_to_axis && last_direction !== ev.direction) {
                    // keep direction on the axis that the drag gesture started on
                    if(ionic.Gestures.utils.isVertical(last_direction)) {
                        ev.direction = (ev.deltaY < 0) ? ionic.Gestures.DIRECTION_UP : ionic.Gestures.DIRECTION_DOWN;
                    } else {
                        ev.direction = (ev.deltaX < 0) ? ionic.Gestures.DIRECTION_LEFT : ionic.Gestures.DIRECTION_RIGHT;
                    }
                }

                // first time, trigger dragstart event
                if(!this.triggered) {
                    inst.trigger(this.name + 'start', ev);
                    this.triggered = true;
                }

                // trigger normal event
                inst.trigger(this.name, ev);

                // direction event, like dragdown
                inst.trigger(this.name + ev.direction, ev);

                // block the browser events
                if((inst.options.drag_block_vertical && ionic.Gestures.utils.isVertical(ev.direction)) ||
                    (inst.options.drag_block_horizontal && !ionic.Gestures.utils.isVertical(ev.direction))) {
                    ev.preventDefault();
                }
                break;

            case ionic.Gestures.EVENT_END:
                // trigger dragend
                if(this.triggered) {
                    inst.trigger(this.name + 'end', ev);
                }

                this.triggered = false;
                break;
        }
    };
};
