<template>
  <div
    class="sl-vue-tree"
    :class="{ 'sl-vue-tree-root': isRoot }"
    @mousemove="onMousemoveHandler"
    @mouseleave="onMouseleaveHandler"
    @dragend="onDragendHandler(null, $event)"
  >
    <div ref="nodes" class="sl-vue-tree-nodes-list">
      <div
        class="sl-vue-tree-node"
        v-for="(node, nodeInd) in nodes"
        :key="nodeInd"
        :class="{ 'sl-vue-tree-selected': node.isSelected }"
      >
        <div
          class="sl-vue-tree-cursor sl-vue-tree-cursor_before"
          @dragover.prevent
          :style="{
            visibility:
              cursorPosition &&
              cursorPosition.node.pathStr === node.pathStr &&
              cursorPosition.placement === 'before'
                ? 'visible'
                : 'hidden'
          }"
        >
          <!-- suggested place for node insertion  -->
        </div>

        <div
          class="sl-vue-tree-node-item"
          @mousedown="onNodeMousedownHandler($event, node)"
          @mouseup="onNodeMouseupHandler($event, node)"
          @contextmenu="emitNodeContextmenu(node, $event)"
          @dblclick="emitNodeDblclick(node, $event)"
          @click="emitNodeClick(node, $event)"
          @dragover="onExternalDragoverHandler(node, $event)"
          @drop="onExternalDropHandler(node, $event)"
          :path="node.pathStr"
          :class="{
            'sl-vue-tree-cursor-hover':
              cursorPosition && cursorPosition.node.pathStr === node.pathStr,

            'sl-vue-tree-cursor-inside':
              cursorPosition &&
              cursorPosition.placement === 'inside' &&
              cursorPosition.node.pathStr === node.pathStr,
            'sl-vue-tree-node-is-leaf': node.isLeaf,
            'sl-vue-tree-node-is-folder': !node.isLeaf
          }"
        >
          <div class="sl-vue-tree-gap" v-for="(gapInd, index) in gaps" :key="index"></div>

          <div class="sl-vue-tree-branch" v-if="level && showBranches">
            <slot name="branch" :node="node">
              <span v-if="!node.isLastChild"
                >{{ String.fromCharCode(0x251c) }}{{ String.fromCharCode(0x2500) }}&nbsp;</span
              >
              <span v-if="node.isLastChild"
                >{{ String.fromCharCode(0x2514) }}{{ String.fromCharCode(0x2500) }}&nbsp;</span
              >
            </slot>
          </div>

          <div class="sl-vue-tree-title">
            <span
              class="sl-vue-tree-toggle"
              v-if="!node.isLeaf"
              @click="onToggleHandler($event, node)"
            >
              <slot name="toggle" :node="node">
                <span>{{ !node.isLeaf ? (node.isExpanded ? "-" : "+") : "" }}</span>
              </slot>
            </span>

            <slot name="title" :node="node">{{ node.title }}</slot>

            <slot
              name="empty-node"
              :node="node"
              v-if="!node.isLeaf && node.children.length == 0 && node.isExpanded"
            ></slot>
          </div>

          <div class="sl-vue-tree-sidebar">
            <slot name="sidebar" :node="node"></slot>
          </div>
        </div>

        <sl-vue-tree
          v-if="node.children && node.children.length && node.isExpanded"
          :value="node.children"
          :level="node.level"
          :parentInd="nodeInd"
          :allowMultiselect="allowMultiselect"
          :allowToggleBranch="allowToggleBranch"
          :edgeSize="edgeSize"
          :showBranches="showBranches"
          @dragover.prevent
        >
          <template slot="title" slot-scope="{ node }">
            <slot name="title" :node="node">{{ node.title }}</slot>
          </template>

          <template slot="toggle" slot-scope="{ node }">
            <slot name="toggle" :node="node">
              <span>{{ !node.isLeaf ? (node.isExpanded ? "-" : "+") : "" }}</span>
            </slot>
          </template>

          <template slot="sidebar" slot-scope="{ node }">
            <slot name="sidebar" :node="node"></slot>
          </template>

          <template slot="empty-node" slot-scope="{ node }">
            <slot
              name="empty-node"
              :node="node"
              v-if="!node.isLeaf && node.children.length == 0 && node.isExpanded"
            ></slot>
          </template>
        </sl-vue-tree>

        <div
          class="sl-vue-tree-cursor sl-vue-tree-cursor_after"
          @dragover.prevent
          :style="{
            visibility:
              cursorPosition &&
              cursorPosition.node.pathStr === node.pathStr &&
              cursorPosition.placement === 'after'
                ? 'visible'
                : 'hidden'
          }"
        >
          <!-- suggested place for node insertion  -->
        </div>
      </div>

      <div
        v-show="isDragging"
        v-if="isRoot && dropOpen"
        ref="dragInfo"
        class="sl-vue-tree-drag-info"
      >
        <slot name="draginfo">Items: {{ selectionSize }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sl-vue-tree",
  props: {
    value: {
      type: Array,
      default: () => []
    },
    edgeSize: {
      type: Number,
      default: 3
    },
    showBranches: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 0
    },
    parentInd: {
      type: Number
    },
    allowMultiselect: {
      type: Boolean,
      default: true
    },
    allowToggleBranch: {
      type: Boolean,
      default: true
    },
    dropOpen: {
      type: Boolean,
      default: true
    },
    multiselectKey: {
      type: [String, Array],
      default() {
        return ["ctrlKey", "metaKey"];
      },
      validator(value) {
        const allowedKeys = ["ctrlKey", "metaKey", "altKey"];
        let multiselectKeys = Array.isArray(value) ? value : [value];
        multiselectKeys = multiselectKeys.filter((keyName) => allowedKeys.indexOf(keyName) !== -1);
        return !!multiselectKeys.length;
      }
    },
    scrollAreaHeight: {
      type: Number,
      default: 70
    },
    maxScrollSpeed: {
      type: Number,
      default: MagicNum.NUM_20
    },
    clearSelNode: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      rootCursorPosition: null,
      scrollIntervalId: 0,
      scrollSpeed: 0,
      lastSelectedNode: null,
      mouseIsDown: false,
      isDragging: false,
      lastMousePos: { x: 0, y: 0 },
      preventDrag: false,
      currentValue: this.value
    };
  },

  mounted() {
    if (this.isRoot) {
      document.addEventListener("mouseup", this.onDocumentMouseupHandler);
    }
  },

  beforeDestroy() {
    document.removeEventListener("mouseup", this.onDocumentMouseupHandler);
  },

  watch: {
    value(newValue) {
      this.currentValue = newValue;
    }
    /*
     * clearSelNode() {
     *   if (this.clearSelNode) {
     *     this.traversalNode(this.nodes);
     *   }
     * }
     */
  },

  computed: {
    cursorPosition() {
      // beslint-disable @typescript-eslint/no-unnecessary-condition
      if (this.isRoot) return this.rootCursorPosition;
      return this.getParent().cursorPosition;
    },

    nodes() {
      if (this.isRoot) {
        const nodeModels = this.copy(this.currentValue);
        return this.getNodes(nodeModels);
      }

      return this.getParent().nodes[this.parentInd].children;
    },
    /**
     * gaps is using for nodes indentation
     * @returns {number[]}
     */
    gaps() {
      const gaps = [];
      let i = this.level - 1;
      if (!this.showBranches) {
        i = Number(i) + 1;
      }
      while ((i -= 1) > 0) gaps.push(i);
      return gaps;
    },

    isRoot() {
      return !this.level;
    },

    selectionSize() {
      return this.getSelected().length;
    },

    dragSize() {
      return this.getDraggable().length;
    }
  },
  methods: {
    /*
     * 递归遍历所有的节点
     *  traversalNode(nodes) {
     *    // nodes.forEach((value, index, array) => {
     *    //   this.updateNode(value.path, { treeSelect: false });
     *    //   if (value.children.length > 0) {
     *    //     this.traversalNode(value.children);
     *    //   }
     *    // });
     *  },
     */

    setCursorPosition(pos) {
      if (this.isRoot) {
        this.rootCursorPosition = pos;
        return;
      }
      this.getParent().setCursorPosition(pos);
    },

    getNodes(nodeModels, parentPath = [], isVisible = true) {
      return nodeModels.map((nodeModel, ind) => {
        const nodePath = parentPath.concat(ind);
        return this.getNode(nodePath, nodeModel, nodeModels, isVisible);
      });
    },

    getNode(path, nodeModel2 = null, siblings2 = null, visible = null) {
      const [ind] = path.slice(-1);
      let isVisible = visible;
      // calculate nodeModel, siblings, isVisible fields if it is not passed as arguments
      const siblings = siblings2 || this.getNodeSiblings(this.currentValue, path);
      const nodeModel = nodeModel2 || (siblings && siblings[ind]) || null;

      if (isVisible === null) {
        isVisible = this.isVisible(path);
      }

      if (!nodeModel) return null;
      const isExpanded = nodeModel.isExpanded === void 0 ? true : !!nodeModel.isExpanded;

      const isDraggable = nodeModel.isDraggable === void 0 ? true : !!nodeModel.isDraggable;
      const isSelectable = nodeModel.isSelectable === void 0 ? true : !!nodeModel.isSelectable;
      const noDrag = nodeModel.noDrag ? nodeModel.noDrag : false;
      const node = {
        // define the all ISlTreeNodeModel props
        ind,
        path,
        isExpanded,
        isVisible,
        isDraggable,
        isSelectable,
        title: nodeModel.title,
        treeSelect: nodeModel.treeSelect,
        isLeaf: !!nodeModel.isLeaf,
        children: nodeModel.children ? this.getNodes(nodeModel.children, path, isExpanded) : [],
        isSelected: !!nodeModel.isSelected,
        // mySelection,
        data: nodeModel.data !== void 0 ? nodeModel.data : {},

        // define the all ISlTreeNode computed props
        pathStr: JSON.stringify(path),
        level: path.length,
        isFirstChild: ind === 0,
        isLastChild: ind === siblings.length - 1,
        noDrag
      };
      return node;
    },

    isVisible(path) {
      if (path.length < 2) return true;
      let nodeModels = this.currentValue;

      for (let i = 0; i < path.length - 1; i += 1) {
        const ind = path[i];
        const nodeModel = nodeModels[ind];
        const isExpanded = nodeModel.isExpanded === void 0 ? true : !!nodeModel.isExpanded;
        if (!isExpanded) return false;
        nodeModels = nodeModel.children;
      }

      return true;
    },

    emitInput(newValue) {
      this.currentValue = newValue;
      this.getRoot().$emit("input", newValue);
    },

    emitSelect(selectedNodes, event) {
      this.getRoot().$emit("select", selectedNodes, event);
    },

    emitBeforeDrop(draggingNodes, position, cancel) {
      this.getRoot().$emit("beforedrop", draggingNodes, position, cancel);
    },

    emitDrop(draggingNodes, position, event) {
      this.getRoot().$emit("drop", draggingNodes, position, event);
    },

    emitToggle(toggledNode, event) {
      this.getRoot().$emit("toggle", toggledNode, event);
    },

    emitNodeClick(node, event) {
      this.updateNode(node.path, { treeSelect: !node.treeSelect });
      this.getRoot().$emit("nodeclick", node, event);
    },

    emitNodeDblclick(node, event) {
      this.getRoot().$emit("nodedblclick", node, event);
    },

    emitNodeContextmenu(node, event) {
      this.getRoot().$emit("nodecontextmenu", node, event);
    },

    onExternalDragoverHandler(node, event) {
      event.preventDefault();
      const root = this.getRoot();
      const cursorPosition = root.getCursorPositionFromCoords(event.clientX, event.clientY);
      root.setCursorPosition(cursorPosition);
      root.$emit("externaldragover", cursorPosition, event);
    },

    onExternalDropHandler(node, event) {
      if (!dropOpen) {
        return;
      }
      const root = this.getRoot();
      const cursorPosition = root.getCursorPositionFromCoords(event.clientX, event.clientY);
      root.$emit("externaldrop", cursorPosition, event);
      this.setCursorPosition(null);
    },

    select(path, addToSelection2 = false, event = null) {
      const multiselectKeys = Array.isArray(this.multiselectKey)
        ? this.multiselectKey
        : [this.multiselectKey];
      const multiselectKeyIsPressed = event && !!multiselectKeys.find((key, index) => event[key]);
      const addToSelection = (multiselectKeyIsPressed || addToSelection2) && this.allowMultiselect;

      const selectedNode = this.getNode(path);
      if (!selectedNode) return null;
      const newNodes = this.copy(this.currentValue);
      const shiftSelectionMode =
        this.allowMultiselect && event && event.shiftKey && this.lastSelectedNode;
      const selectedNodes = [];
      let shiftSelectionStarted = false;

      this.traverse((node, nodeModel) => {
        if (shiftSelectionMode) {
          if (
            node.pathStr === selectedNode.pathStr ||
            node.pathStr === this.lastSelectedNode.pathStr
          ) {
            nodeModel.isSelected = node.isSelectable;
            shiftSelectionStarted = !shiftSelectionStarted;
          }
          if (shiftSelectionStarted) nodeModel.isSelected = node.isSelectable;
        } else if (node.pathStr === selectedNode.pathStr) {
          nodeModel.isSelected = node.isSelectable;
        } else if (!addToSelection) {
          if (nodeModel.isSelected) nodeModel.isSelected = false;
        }
        if (nodeModel.isSelected) selectedNodes.push(node);
      }, newNodes);

      this.lastSelectedNode = selectedNode;
      this.emitInput(newNodes);
      this.emitSelect(selectedNodes, event);
      return selectedNode;
    },

    onMousemoveHandler(event) {
      if (!this.isRoot) {
        this.getRoot().onMousemoveHandler(event);
        return;
      }

      if (this.preventDrag) return;

      const initialDraggingState = this.isDragging;
      const isDragging =
        this.isDragging ||
        (this.mouseIsDown &&
          (this.lastMousePos.x !== event.clientX || this.lastMousePos.y !== event.clientY));

      const isDragStarted = !initialDraggingState && isDragging;

      this.lastMousePos = {
        x: event.clientX,
        y: event.clientY
      };

      if (!isDragging) return;

      const $root = this.getRoot().$el;
      const rootRect = $root.getBoundingClientRect();
      const $dragInfo = this.$refs.dragInfo;
      const dragInfoTop =
        event.clientY -
        Number(rootRect.top) +
        Number($root.scrollTop) -
        ($dragInfo.style.marginBottom | 0);
      const dragInfoLeft = event.clientX - rootRect.left;

      $dragInfo.style.top = `${dragInfoTop}px`;
      $dragInfo.style.left = `${dragInfoLeft}px`;

      const cursorPosition = this.getCursorPositionFromCoords(event.clientX, event.clientY);
      const destNode = cursorPosition.node;
      const { placement } = cursorPosition;

      if (isDragStarted && !destNode.isSelected) {
        this.select(destNode.path, false, event);
      }

      const draggableNodes = this.getDraggable();
      if (!draggableNodes.length) {
        this.preventDrag = true;
        return;
      }

      this.isDragging = isDragging;

      this.setCursorPosition({ placement, node: destNode });

      const scrollBottomLine = rootRect.bottom - this.scrollAreaHeight;
      const scrollDownSpeed =
        (event.clientY - scrollBottomLine) / (rootRect.bottom - scrollBottomLine);
      const scrollTopLine = Number(rootRect.top) + Number(this.scrollAreaHeight);
      const scrollTopSpeed = (scrollTopLine - event.clientY) / (scrollTopLine - rootRect.top);

      if (scrollDownSpeed > 0) {
        this.startScroll(scrollDownSpeed);
      } else if (scrollTopSpeed > 0) {
        this.startScroll(-scrollTopSpeed);
      } else {
        this.stopScroll();
      }
    },

    getCursorPositionFromCoords(x, y) {
      const $target = document.elementFromPoint(x, y);
      const $nodeItem = $target.getAttribute("path")
        ? $target
        : this.getClosetElementWithPath($target);
      let destNode = null;
      let placement = null;

      if ($nodeItem) {
        if (!$nodeItem) return;

        destNode = this.getNode(JSON.parse($nodeItem.getAttribute("path")));

        const nodeHeight = $nodeItem.offsetHeight;
        const { edgeSize } = this;
        const offsetY = y - $nodeItem.getBoundingClientRect().top;

        if (destNode.isLeaf) {
          placement = offsetY >= nodeHeight / 2 ? "after" : "before";
        } else if (offsetY <= edgeSize) {
          placement = "before";
        } else if (offsetY >= nodeHeight - edgeSize) {
          placement = "after";
        } else {
          placement = "inside";
        }
      } else {
        const $root = this.getRoot().$el;
        const rootRect = $root.getBoundingClientRect();
        if (y > Number(rootRect.top) + Number(rootRect.height) / 2) {
          placement = "after";
          destNode = this.getLastNode();
        } else {
          placement = "before";
          destNode = this.getFirstNode();
        }
      }

      return { placement, node: destNode };
    },

    getClosetElementWithPath($el) {
      if (!$el) return null;
      if ($el.getAttribute("path")) return $el;
      return this.getClosetElementWithPath($el.parentElement);
    },

    onMouseleaveHandler(event) {
      if (!this.isRoot || !this.isDragging) return;
      const $root = this.getRoot().$el;
      const rootRect = $root.getBoundingClientRect();
      if (event.clientY >= rootRect.bottom) {
        this.setCursorPosition({
          node: this.nodes.slice(-1)[0],
          placement: "after"
        });
      } else if (event.clientY < rootRect.top) {
        this.setCursorPosition({
          node: this.getFirstNode(),
          placement: "before"
        });
      }
    },

    getNodeEl(path) {
      this.getRoot().$el.querySelector(`[path="${JSON.stringify(path)}"]`);
    },

    getLastNode() {
      let lastNode = null;
      this.traverse((node, index) => {
        lastNode = node;
      });
      return lastNode;
    },

    getFirstNode() {
      return this.getNode([0]);
    },

    getNextNode(path, filter = null) {
      let resultNode = null;

      this.traverse((node, index) => {
        if (this.comparePaths(node.path, path) < 1) return;

        if (!filter || filter(node)) {
          resultNode = node;
          return false; // stop traverse
        }
      });

      return resultNode;
    },

    getPrevNode(path, filter) {
      const prevNodes = [];

      this.traverse((node, index) => {
        if (this.comparePaths(node.path, path) >= 0) {
          return false;
        }
        prevNodes.push(node);
      });

      let i = prevNodes.length;
      while (i) {
        const node = prevNodes[i];
        i -= 1;
        if (!filter || filter(node)) return node;
      }

      return null;
    },

    /**
     * returns 1 if path1 > path2
     * returns -1 if path1 < path2
     * returns 0 if path1 == path2
     *
     * examples
     *
     * [1, 2, 3] < [1, 2, 4]
     * [1, 1, 3] < [1, 2, 3]
     * [1, 2, 3] > [1, 2, 0]
     * [1, 2, 3] > [1, 1, 3]
     * [1, 2] < [1, 2, 0]
     *
     */
    comparePaths(path1, path2) {
      for (let i = 0; i < path1.length; i += 1) {
        if (path2[i] === void 0) return 1;
        if (path1[i] > path2[i]) return 1;
        if (path1[i] < path2[i]) return -1;
      }
      return path2[path1.length] === void 0 ? 0 : -1;
    },

    onNodeMousedownHandler(event, node) {
      // handle only left mouse button
      if (event.button !== 0) return;

      if (!this.isRoot) {
        this.getRoot().onNodeMousedownHandler(event, node);
        return;
      }
      this.mouseIsDown = true;
    },

    startScroll(speed) {
      const $root = this.getRoot().$el;
      if (this.scrollSpeed === speed) return;
      if (this.scrollIntervalId) {
        this.stopScroll();
      }

      this.scrollSpeed = speed;
      this.scrollIntervalId = setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        $root.scrollTop += this.maxScrollSpeed + Number(speed);
      }, MagicNum.NUM_20);
    },

    stopScroll() {
      clearInterval(this.scrollIntervalId);
      this.scrollIntervalId = 0;
      this.scrollSpeed = 0;
    },

    onDocumentMouseupHandler(event) {
      if (this.isDragging) this.onNodeMouseupHandler(event);
    },

    onNodeMouseupHandler(event, targetNode = null) {
      // handle only left mouse button
      if (event.button !== 0) return;

      if (!this.isRoot) {
        this.getRoot().onNodeMouseupHandler(event, targetNode);
        return;
      }

      this.mouseIsDown = false;

      if (!this.isDragging && targetNode && !this.preventDrag) {
        this.select(targetNode.path, false, event);
      }

      this.preventDrag = false;

      if (!this.cursorPosition) {
        this.stopDrag();
        return;
      }

      const draggingNodes = this.getDraggable();

      // check that nodes is possible to insert
      for (const draggingNode of draggingNodes) {
        if (draggingNode.pathStr === this.cursorPosition.node.pathStr) {
          this.stopDrag();
          return;
        }

        if (this.checkNodeIsParent(draggingNode, this.cursorPosition.node)) {
          this.stopDrag();
          return;
        }
      }

      const newNodes = this.copy(this.currentValue);
      const nodeModelsSubjectToInsert = [];

      // find dragging model to delete
      for (const draggingNode of draggingNodes) {
        const sourceSiblings = this.getNodeSiblings(newNodes, draggingNode.path);
        const draggingNodeModel = sourceSiblings[draggingNode.ind];
        nodeModelsSubjectToInsert.push(draggingNodeModel);
      }

      // allow the drop to be cancelled
      let cancelled = false;
      this.emitBeforeDrop(draggingNodes, this.cursorPosition, () => (cancelled = true));

      if (cancelled) {
        this.stopDrag();
        return;
      }

      const nodeModelsToInsert = [];

      // mark dragging model to delete
      for (const draggingNodeModel of nodeModelsSubjectToInsert) {
        nodeModelsToInsert.push(this.copy(draggingNodeModel));
        draggingNodeModel["_markToDelete"] = true;
      }

      // insert dragging nodes to the new place
      this.insertModels(this.cursorPosition, nodeModelsToInsert, newNodes);

      // delete dragging node from the old place
      this.traverseModels((nodeModel, siblings, ind) => {
        if (!nodeModel._markToDelete) return;
        siblings.splice(ind, 1);
      }, newNodes);

      this.lastSelectedNode = null;
      this.emitInput(newNodes);
      this.emitDrop(draggingNodes, this.cursorPosition, event);
      this.stopDrag();
    },

    onToggleHandler(event, node) {
      if (!this.allowToggleBranch) return;
      this.updateNode(node.path, { isExpanded: !node.isExpanded });
      this.emitToggle(node, event);
      event.stopPropagation();
    },

    stopDrag() {
      this.isDragging = false;
      this.mouseIsDown = false;
      this.setCursorPosition(null);
      this.stopScroll();
    },

    getParent() {
      return this.$parent;
    },

    getRoot() {
      if (this.isRoot) return this;
      return this.getParent().getRoot();
    },

    getNodeSiblings(nodes, path) {
      if (path.length === 1) return nodes;
      return this.getNodeSiblings(nodes[path[0]].children, path.slice(1));
    },

    updateNode(path, patch) {
      if (!this.isRoot) {
        this.getParent().updateNode(path, patch);
        return;
      }
      const pathStr = JSON.stringify(path);
      const newNodes = this.copy(this.currentValue);
      this.traverse((node, nodeModel) => {
        if (node.pathStr !== pathStr) return;
        Object.assign(nodeModel, patch);
      }, newNodes);
      this.emitInput(newNodes);
    },

    getTreeSelected() {
      const selectedNodes = [];
      this.traverse((node, index) => {
        if (node.treeSelect) {
          selectedNodes.push(node);
        }
      });
      return selectedNodes;
    },

    getSelected() {
      const selectedNodes = [];
      this.traverse((node, index) => {
        if (node.isSelected) selectedNodes.push(node);
      });
      return selectedNodes;
    },

    getDraggable() {
      const selectedNodes = [];
      this.traverse((node, index) => {
        if (node.isSelected && node.isDraggable) selectedNodes.push(node);
      });
      return selectedNodes;
    },

    traverse(cb, nodeModels2 = null, parentPath = []) {
      let nodeModels = nodeModels2;
      if (!nodeModels2) {
        nodeModels = this.currentValue;
      }

      let shouldStop = false;

      const nodes = [];

      for (let nodeInd = 0; nodeInd < nodeModels.length; nodeInd += 1) {
        const nodeModel = nodeModels[nodeInd];
        const itemPath = parentPath.concat(nodeInd);
        const node = this.getNode(itemPath, nodeModel, nodeModels);
        shouldStop = cb(node, nodeModel, nodeModels) === false;
        nodes.push(node);

        if (shouldStop) break;

        if (nodeModel.children) {
          shouldStop = this.traverse(cb, nodeModel.children, itemPath) === false;
          if (shouldStop) break;
        }
      }

      return !shouldStop ? nodes : false;
    },

    traverseModels(cb, nodeModels) {
      let i = nodeModels.length;
      while ((i -= 1)) {
        const nodeModel = nodeModels[i];
        if (!nodeModel) return;
        if (!nodeModel.children) return;
        if (nodeModel.children) this.traverseModels(cb, nodeModel.children);
        cb(nodeModel, nodeModels, i);
      }
      return nodeModels;
    },

    remove(paths) {
      const pathsStr = paths.map((path) => JSON.stringify(path));
      const newNodes = this.copy(this.currentValue);
      this.traverse((node, nodeModel, siblings) => {
        for (const pathStr of pathsStr) {
          if (node.pathStr === pathStr) nodeModel._markToDelete = true;
        }
      }, newNodes);

      this.traverseModels((nodeModel, siblings, ind) => {
        if (!nodeModel._markToDelete) return;
        siblings.splice(ind, 1);
      }, newNodes);

      this.emitInput(newNodes);
    },

    insertModels(cursorPosition, nodeModels, newNodes) {
      const destNode = cursorPosition.node;
      const destSiblings = this.getNodeSiblings(newNodes, destNode.path);
      const destNodeModel = destSiblings[destNode.ind];

      if (cursorPosition.placement === "inside") {
        destNodeModel.children = destNodeModel.children || [];
        destNodeModel.children.unshift(...nodeModels);
      } else {
        const insertInd =
          cursorPosition.placement === "before" ? destNode.ind : Number(destNode.ind) + 1;

        destSiblings.splice(insertInd, 0, ...nodeModels);
      }
    },

    insert(cursorPosition, nodeModel) {
      const nodeModels = Array.isArray(nodeModel) ? nodeModel : [nodeModel];
      const newNodes = this.copy(this.currentValue);

      this.insertModels(cursorPosition, nodeModels, newNodes);

      this.emitInput(newNodes);
    },

    checkNodeIsParent(sourceNode, destNode) {
      const destPath = destNode.path;
      return JSON.stringify(destPath.slice(0, sourceNode.path.length)) === sourceNode.pathStr;
    },

    copy(entity) {
      return JSON.parse(JSON.stringify(entity));
    },
    onDragendHandler(val, event) {}
  }
};
</script>
