using Business.Models.DTOs;
using System.Numerics;

namespace Business.Extensions;

public static class CompareDtoExtensions
{
    public static bool IsPositive<TData>(this CompareDto<TData> source) where TData : INumber<TData> => source.Diff() > TData.Zero;

    public static bool IsNegative<TData>(this CompareDto<TData> source) where TData : INumber<TData>
        => source.Diff() < TData.Zero;

    public static TData Diff<TData>(this CompareDto<TData> source) where TData : INumber<TData> => source.Current - source.Other;
}