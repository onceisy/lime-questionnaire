import { OptionType } from '@/views/Config/OptionsConfig/OptionEdit';

/**
 * @description:
 * @param {OptionType} data 树形数据结构
 * @return {*}
 */
export function getTreeMaxLevel(data: OptionType) {
  if (!data.children) {
    return 1;
  } else {
    let max = 0;
    for (const child of data.children) {
      const level = getTreeMaxLevel(child);
      if (level > max) {
        max = level;
      }
    }
    return max + 1;
  }
}

/**
 * @description: 计算id在树形结构中所在的层级
 * @param {OptionType} tree
 * @param {string} targetId
 * @param {*} level
 * @return {*}
 */
export function calculateLevel(tree: OptionType, targetId: string, level = 0): number {
  if (tree.key === targetId) {
    return level;
  }
  if (tree.children) {
    for (const child of tree.children) {
      const result = calculateLevel(child, targetId, level + 1);
      if (result !== -1) {
        return result;
      }
    }
  }
  return -1;
}

/**
 * @description: 给出一个树结构和层级，只保留给定的层级
 * @param {OptionType} tree
 * @param {number} level
 * @return {*}
 */
export function getTreeNodeByLevel(tree: OptionType, level: number): OptionType {
  if (level <= 0) {
    // 当前层级达到目标层级，返回当前节点的副本
    return {
      label: tree.label,
      children: [],
      key: tree.key,
    };
  } else {
    // 递归处理子节点
    const children = tree.children?.map((child: OptionType) =>
      getTreeNodeByLevel(child, level - 1)
    );
    // 返回当前节点和处理后的子节点数组
    return {
      label: tree.label,
      key: tree.key,
      children,
    };
  }
}
